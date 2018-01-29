import { setInterval } from "timers";


var jjj=1;

kashem=setInterval(function() {
    console.log('cow eat grass');
    jjj++;
if (jjj>4){
    clearInterval(kashem);
        }},2000)

var y=setInterval(killer,20);

function killer(){
    console.log('java applett');
}