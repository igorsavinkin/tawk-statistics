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
  if (stat){ 
	  console.log('All dates stat:\n', processStatistics());
	  
	  const start = "2019-04-01T00:00:00.000Z";
	  const end = "2019-04-14T00:00:00.000Z";
	  console.log('\nGiven dates range stat:' );
	  console.log('Start date: ', start );
	  console.log('End date: ', end );	  
	  console.log( processStatistics(new Date(start), new Date(end) ));	  
  } else {
	  console.log('Statistic file is empty.');
  } 
});


function processStatistics(start, end){
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
		countersByWebsite[item['websiteId']] = {'chats' : item['chats'], 'missedChats' : item['missedChats'] , 'websiteId':  item['websiteId'] };
	}
}