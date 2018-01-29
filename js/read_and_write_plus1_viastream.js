var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8.
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){

//
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
 console.log(newString);

////////////////////////
// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writerStream.write(newString,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
