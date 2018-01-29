// print the buf in hex format, with 0xab for each hex value.    
// it should look like:



buf_ascii = new Buffer(26);
//buf_2 = ['0x'];
//console.log(buf_2);
    for (var i = 0 ; i < 26 ; i++) {
          buf_ascii[i] = (i + 97);
    }
//    console.log(buf_ascii); 
var q ='';
    for (var i = 0 ; i < 26 ; i++){
        q+= '0x'+buf_ascii[i].toString(16)+' ';
    }
console.log(q);