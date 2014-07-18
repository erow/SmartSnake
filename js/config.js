var view=document.getElementById("view");
view.width=unit*30;
view.height=unit*30;//地图大小为30*30
cxt=view.getContext("2d");

colors[0]="#ffffff";colors[1]="#666666";colors[5]="#ff0000";colors[6]="#00ff00";colors[2]="ffff00";
var ss=new game(30);
var time;
function start(){time=setInterval('ss.Interval()',200);

}
function die(){
     alert("you die :");
    clearInterval(time);
}

var s1=document.getElementById('p1');
var s2=document.getElementById('p2');

for(var q in codes){
 var varItem = new Option(q, codes[q].toString());
s1.options.add(varItem);
varItem = new Option(q, codes[q].toString());
s2.options.add(varItem);
}
function selectChange(who){
    if(who=='0')
    var txt=s1.options[s1.selectedIndex];
    else
    var txt=s2.options[s2.selectedIndex];
    myCodeMirror.setValue(txt.value);
    ss.player[who].search=codes[txt.text];
   
}
