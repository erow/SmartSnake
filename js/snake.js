var colors=new Array()//颜色对应表
//0:空 1:apple 5:玩家1 6：玩家2 2:head
var unit=20;//单位大小
var map;
var cxt;
function game(size){//正方形地图,size为单元格的数量---------------------------

var m_map=new Array2(size,0);
map=clone(m_map);
this.player=new Array();this.player[0]=new snake(new point(10,15),5);this.player[1]=new snake(new point(20,15),6);
this.apple=new point(15,15);//食物
drawcell(15,15,colors[1]);
this.Interval=function(){
    map=clone(m_map);
    for(var i=0;i<this.player.length;i++){
    this.player[i].go();}
};
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
        m_map[this.x][this.y]=w;
    };
    this.moveto=function(a,b,w){
        m_map[this.x][this.y]=0;
         this.x=a;this.y=b;
        m_map[this.x][this.y]=w;
    };
}


function snake(pos,num){
     this.body=[];
     this.body.push(new point(pos.x,pos.y));
     this.body.push(new point(pos.x,pos.y));
     this.body[1].move('w');
    var k=num;//蛇的编号:与map对应
    this.body[0].mark(k);
    this.body[1].mark(k);
    drawcell(pos.x,pos.y,colors[k]);
    drawcell(this.body[1].x,this.body[1].y,colors[k]);
    this.dir='s';
    var grow=0;//不为0时生长
    this.search=null;
    
    this.go=function(){
        if(null !==  this.search)
        this.dir=this.search(this);
        var tem;
        tem=new point(this.body[0].x,this.body[0].y);
         drawcell(tem.x,tem.y,colors[k]);
        tem.move(this.dir); 
        this.body.unshift(tem);
       
        check(this);
        tem.mark(k);
        drawcell(tem.x,tem.y,colors[2]);
       // head=head>0?(head-1)%this.body.length:this.body.length-1;
       
        if(grow){
            grow--;
        }else{
            var end=this.body.pop();
            end.mark(0);
             drawcell( end.x, end.y,colors[0]);
        }
          
    };grow++;this.go();
 this.me=function(){
    console.log(this);
        return k-4;
    };
this.enemy =function(){
        return 11-k;
    };
}

}//game------------------------------------------------
function Array2(size,value){
    var t=new Array();
    for(var i=0;i<size;i++){
        t[i]=new Array();
    for(var j=0;j<size;j++)
    t[i][j]=value;
    }
    return t;
}

function clone(myObj){ 
    if(typeof(myObj) != 'object') return myObj; 
    if(myObj === null) return myObj; 
    var myNewObj = new Object(); 
    for(var i in myObj) 
    myNewObj[i] = clone(myObj[i]); 
    return myNewObj; 
} 

function drawcell(x,y,color){
    cxt.fillStyle=color;
    cxt.fillRect(x*unit,y*unit,unit,unit);
}

 var check=function(self){
        var c=map[self.body[0].x][self.body[0].y];
       // console.log(y);
       if(c==='undefined') die();
        switch(c){
            case 0:return;
            case 1:grow++;
            var x,y;
            drawcell(ss.apple.x,ss.apple.y,colors[0]);
            while(!(x>1&&y>1&&x<29&&y<29)){
                x=Math.random()%29;
                y=Math.random()%29;
            }
            ss.apple.moveto(x,y,1);
            drawcell(ss.apple.x,ss.apple.y,colors[1]);
            break;
            default:
            die();
            break;
        }
    };