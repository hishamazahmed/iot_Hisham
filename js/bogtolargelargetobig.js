var fs = require("fs");
var data = new Buffer(abcDEF);

 for (var i = 0; i < 6; i++) {
	 
		newString += String.fromCharCode(data.charCodeAt(i) );
	if (data.charCodeAt(i) == 32 ){
	}
	
     else if ((96 < data.charCodeAt(i) && data.charCodeAt(i) < 123) || 
	 (64 < data.charCodeAt(i) && data.charCodeAt(i) < 91)) 
	 
	 
	 {
         newString += String.fromCharCode(data.charCodeAt(i) + 1);
     }
  }
  

console.log(newString);
