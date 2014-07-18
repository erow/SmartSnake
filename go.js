    var m_map=new Array(30);
    var map=new Array(30);
    var i=30;
    var time;
    while(i--){
        map[i]=new Array(30);
    }
    for(var i=0;i<30;i++)
    for(var j=0;j<30;j++)
    if((i>0&&j>0&&i<29&&j<29))
        map[i][j]=0;
        else
        map[i][j]=3;
    //map对应表：0-空,1-果实,3-墙或身体,4-玩家1,5-玩家2
    var unit=20;
    var num=4;
    var cxt;//绘图句柄
    var color={4:"#ff0000",5:"0000ff"};
    function clone(myObj){ 
if(typeof(myObj) != 'object') return myObj; 
if(myObj === null) return myObj; 
var myNewObj = new Object(); 
for(var i in myObj) 
myNewObj[i] = clone(myObj[i]); 
return myNewObj; 
} 
function point(a,b){
    this.x=a;this.y=b;
    this.move=function(dir){
        if(dir=="w"){
            this.y--;
        }
        if(dir=="d"){
            this.x++;
        }
        if(dir=="a"){
            this.x--;
        }
        if(dir=="s"){
            this.y++;
        }
        return this;
    };
    this.mark=function(w){
        map[this.x][this.y]=w;
    };
    this.moveto=function(a,b,w){
         map[this.x][this.y]=0;
         this.x=a;this.y=b;
         map[this.x][this.y]=w;
    };
}
function drawcell(x,y,color){
    cxt.fillStyle=color;
    cxt.fillRect(x*unit,y*unit,unit,unit);
}
var selfhead=function(){
        return body[0];
    };
var enemyhead =function(){
        if(player[0]===self){
            return player[1].body[0];
        }else 
        return player[0].body[0];
    };
    
function snake(pos){
    var self=this;
        
     this.body=[];
     this.body.push(new point(pos.x,pos.y));
     this.body.push(new point(pos.x,pos.y));
     this.body[1].move('w');
    var head=0;
    var k=num++;
    pos.mark(k);
    this.body[1].mark(k);
    drawcell(pos.x,pos.y,color[k]);
     drawcell(this.body[1].x,this.body[1].y,color[k]);
    this.dir='s';
    var grow=0;//不为0时生长
    this.search=0;
    this.go=function(){
        if(0 !==  this.search)
        this.dir=this.search();
        
        var tem;
      
        tem=new point(this.body[head].x,this.body[head].y);
        tem.move(this.dir); 
         this.body.unshift(tem);
        check();
        tem.mark(k);
        drawcell(tem.x,tem.y,color[k]);
       // head=head>0?(head-1)%this.body.length:this.body.length-1;
       
        if(grow){
            grow--;
        }else{
            var end=this.body.pop();
            end.mark(0);
             drawcell( end.x, end.y,"#ffffff");
        }
          
    };
    var check=function(){
      
        var y=map[self.body[0].x][self.body[0].y];
       // console.log(y);
        switch(y){
            case 0:return;
            case 1:grow++;
            var x,y;
            drawcell(apple.x,apple.y,"#ffffff");
            while(!(x>1&&y>1&&x<29&&y<29)){
                x=Math.random()%29;
                y=Math.random()%29;
                
            }
            apple.moveto(x,y,1);
            drawcell(apple.x,apple.y,"#ffff00");
            break;
            case 3:
            alert("you die :"+k);
            clearInterval(time);
            break;
        }
    }

    
}



   
var view=document.getElementById("view");
view.width=unit*30;
view.height=unit*30;//地图大小为30*30


cxt=view.getContext("2d");
 cxt.fillStyle="#EAEAEF";
    cxt.fillRect(0,0,unit*30,unit);
    cxt.fillRect(0,0,unit,30*unit);
    cxt.fillRect(0,unit*29,unit*30,unit);
    cxt.fillRect(unit*29,0,unit,30*unit);

var player=new Array();
player[0]=new snake(new point(10,14));
player[1]=new snake(new point(20,14));
var apple=new point(15,20);
apple.mark(1);
drawcell(apple.x,apple.y,"#ffff00");
var smart=Array();
smart['default']=function(){
    function func(p){
        if(map[p.x][p.y]>1) return 0;
        return Math.abs(apple.x-p.x)+Math.abs(apple.y-p.y);
    }
    var d=new Array();d['a']=d['w']=d['s']=d['d']=0;
    var head=clone(  this.body[0]);
    var sum=0;
    sum+=d['a']=func(head.move('a'));
    head=clone(this.body[0]);
    sum+=d['w']=func(head.move('w'));
    head=clone(  this.body[0]);
    sum+=d['d']=func(head.move('d'));
    head=clone(  this.body[0]);
    sum+=d['s']=func(head.move('s'));
   // console.log(sum);
    sum=Math.ceil(Math.random()*sum);   
   // console.log(sum);
     sum-=d['a'];
      if(sum<=0)
    return 'a';
     sum-=d['w'];
      if(sum<=0)
    return 'w';
     sum-=d['d'];
      if(sum<=0)
    return 'd';
     sum-=d['s'];
    
    return 's';}
player[0].search=smart['default'];
player[1].search=smart['default'];
function start(){time=setInterval('var t=player.length;while(t--){player[t].go();}',200);

 var txt=s1.options[s1.selectedIndex].value+";";
 //console.log(txt);
 txt=txt.replace(/[\r\n]/g,"");
 console.log("player[0].search="+txt);
eval("player[0].search="+txt);
// eval("player[0].search=function(){return 'd';}; ");
 txt=s2.options[s2.selectedIndex].value;
 
// eval("player[1].search="+txt);
 
}


var s1=document.getElementById('p1');
var s2=document.getElementById('p2');

for(var q in codes){
 var varItem = new Option(q, codes[q]);
s1.options.add(varItem);
varItem = new Option(q, codes[q]);
s2.options.add(varItem);
}