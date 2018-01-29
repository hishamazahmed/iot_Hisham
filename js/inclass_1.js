buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
// This is a function to process the input string and convert it to HEX. 
for (var j=1; j<27; j++){
    console.log( "0x" + buf.toString('hex',(j-1),j),' ');
}
