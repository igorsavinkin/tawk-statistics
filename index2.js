const request = require('request'); 
const url='https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json';  

function processStatistics(stat, start, end){
  let countersByWebsite =[];
  for(let item of stat){
    if (start && end){      
      let item_date = new Date(item['date']); 
      if (item_date >= start && end >= item_date) {
        //console.log('Process for that date: ', item_date);
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
function main(url) { 
	request(url, { json: true } , function (error, response, body) {
	  if (error) {
		console.error('error:', error);
		process.exit();
	  } 
	  if (response.statusCode != '200') {
		console.log('statusCode:', response && response.statusCode);  
		process.exit();
	  }   
		let res = processStatistics(body);
		console.log('All dates stat:\n', res);
		// write to file 
		const { writeFile } = require("fs");
		let fileName = "result.json";
		writeFile(fileName, JSON.stringify(res), (err) => {
		  if (err) return console.error("Unable to save json to file", err);
		  console.log("Data successfully saved to file in json");
		});

		const start = "2019-04-01T00:00:00.000Z";
		const end = "2019-04-14T00:00:00.000Z";
		console.log('\nGiven dates range stat:' );
		console.log('Start date: ', start );
		console.log('End date: ', end );    
		console.log( processStatistics(body, new Date(start), new Date(end) ));    
	});
}
main(url);

