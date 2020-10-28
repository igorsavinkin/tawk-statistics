const request = require('request');
var stat;
const d = new Date(2019, 3, 1);
console.log(d);
console.log('month:', d.getMonth());
console.log('day:', d.getDay());

const d2 = new Date("2019-04-01T00:00:00.000Z");
const d3 = new Date("2019-04-01T00:00:00.000Z");
console.log('d2: ', d2);
console.log('d3: ', d3);
console.log(d3 >= d2);
//process.exit();
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


function processStatistics(start, end){
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