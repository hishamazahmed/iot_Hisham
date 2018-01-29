var fs = require("fs");
var data = '';
// Create a readable stream
var readerStream = fs.createReadStream('iiput.txt');
// Set the encoding to be utf8.
readerStream.setEncoding('UTF8');
// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){

var newString = '';
 for (var i = 0; i < data.length; i++) {
	 
	if (data.charCodeAt(i) == 32 ){
		newString += String.fromCharCode(data.charCodeAt(i) );
	}
	
     else if ((96 < data.charCodeAt(i) && data.charCodeAt(i) < 123) || 
	 (64 < data.charCodeAt(i) && data.charCodeAt(i) < 91)) {
         newString += String.fromCharCode(data.charCodeAt(i) + 1);
     }
  }
  
console.log("old data : "+data);
console.log("data after addition: "+newString);});
