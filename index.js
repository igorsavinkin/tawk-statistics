const request = require('request');
var stat;

const url='https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json'; 
request(url, function (error, response, body) {
  if (error) {
	  console.error('error:', error);
	  process.exit();
  } 
  if (response.statusCode != '200') {
	  console.log('statusCode:', response && response.statusCode);  
	  process.exit();
  }
  stat = JSON.parse(body);
  //console.log('body as json:', stat ); // Print stat 
  if (stat){
	  // start processing
	  console.log( processStatistics());	  
  }  
});


function processStatistics(){
	var countersByWebsite =[];
	for(let item of stat){
		//console.log(item['websiteId']);
		if (item['websiteId'] in countersByWebsite){
			countersByWebsite[item['websiteId']]['chats'] += item['chats'];
			countersByWebsite[item['websiteId']]['missedChats'] += item['missedChats'];
		} else {
			//countersByWebsite[item['websiteId']] = { };
			countersByWebsite[item['websiteId']] = {'chats' : item['chats'], 'missedChats' : item['missedChats'] , 'websiteId':  item['websiteId'] };
		}		 
	}
	/* for (item in countersByWebsite){
		countersByWebsite[]= key;
	}  */
	return Object.values(countersByWebsite); 
}