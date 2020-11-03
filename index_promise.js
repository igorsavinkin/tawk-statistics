const request = require('request'); 
const url ='https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json'; 

function processStatistics(stat, start, end){
  let countersByWebsite =[];
  for(let item of stat){
    if (start && end){      
      let item_date = new Date(item['date']); 
      if (item_date >= start && end >= item_date) {
        processItem(item, countersByWebsite);
      }      
    } else {
      processItem(item, countersByWebsite);
    }    
  } 
  return Object.values(countersByWebsite); 
}

function processItem(item, countersByWebsite){
  if (item['websiteId'] in countersByWebsite){
    countersByWebsite[item['websiteId']]['chats'] += item['chats'];
    countersByWebsite[item['websiteId']]['missedChats'] += item['missedChats'];
  } else { 
    countersByWebsite[item['websiteId']] = { 
       'chats' : item['chats'], 
       'missedChats' : item['missedChats'] , 
       'websiteId':  item['websiteId'] 
    };
  }
}
// self executing function
(() => {  
	let promise = new Promise(function(resolve, reject){
		request(url, {json : true}, function (error, response, body) {// fetch
		if (error) { 
			  reject(error);
		} else if ( response.statusCode != '200') {
			  reject('statusCode:' + response.statusCode); 
		} else {
			// process w/o filter  
			resolve(processStatistics(body));
		}
		 
		});
	}); 
	promise
		.then( (result) => { console.log(result) })
		.catch( (errorMsg) => { 
			console.log('Promise got rejected.');
			console.log(errorMsg); 
		});		
})();