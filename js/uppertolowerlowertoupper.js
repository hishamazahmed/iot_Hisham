buf = new Buffer(26);
  buf="abcDEF"

console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz


for (var q=0 ; q <6;q++){

    if (96 <buf.charCodeAt(q) && buf.charCodeAt(q)< 121){
    console.log(String.fromCharCode(buf.charCodeAt(q)-32));}

    else if(64 <buf.charCodeAt(q) && buf.charCodeAt(q)< 90){
    console.log(String.fromCharCode(buf.charCodeAt(q)+32));}

}
