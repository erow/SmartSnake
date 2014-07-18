
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
  <title>智能贪吃蛇</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <link rel="stylesheet" href="style.css" type="text/css" />
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="./css/bootstrap.min.css" type="text/css">
    <script type="text/javascript" src="js/jq.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <!--codemirror-->
    
    <link rel="stylesheet" href="./css/codemirror.css">
    <script src="js/codemirror.js"></script>
    <script src="js/javascript.js"></script>
</head>
<body class="container">

<script type="text/javascript">
var codes=new Array();
var temp;
<?php
    $data=fopen('./func','r');
    $contents = fread($data, filesize ('./func'));
    fclose($data);
    $code=unserialize($contents);
    foreach( $code as $x=>$x_v){
  //$f=$i
    echo 'temp='.$x_v.';';
    echo "codes['$x']=temp;";
    }

?>
console.log(codes);
</script>


    <canvas id="view">
    </canvas>
    <br/>
    <select id="p1" class="selectpicker" onchange="selectChange('0')"></select>
    <div onclick="start()" class="btn btn-success">start</div>
    <div onclick="clearInterval(time)" class="btn btn-warning">pause</div>
    <select id="p2" class="selectpicker" onchange="selectChange('1')"></select>
    
    <script type="text/javascript" src="js/snake.js"></script>
    <script type="text/javascript" src="js/config.js"></script>

<br/>
<form action="server.php" method="post" onsubmit="">
 <textarea id="code" name='code'>
 /*全局量
 地图大小30*30
 map[x][y]:内容映射
 0:空 1:apple 5:玩家1 6：玩家2 2:蛇头
 ss.apple:食物
 ss.player[0,1]: 2个玩家
 this.me(),this.enemy:返回玩家编号
 玩家类存储身体信息,
 ss.player[0].body[i].[x,y]:为坐标
 
 游戏规则：
 在本编辑框内根据以上函数获取信息
 编写javascript代码
 返回下一步的方向
 
 PS:
 请遵守规则，请勿修改全局量。
 
 */
function () {
return 's';
}//返回 w,a,s,d 4个方向
    </textarea>
   
 <br/>
 你的名字:<input type="text" name="name"/>
 <input type="submit" value="Submit" class="btn btn-primary" />
</form>

</body>
</html>
<script type="text/javascript" >
var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('code'),{
  lineNumbers: true,
  mode:  "javascript"
});
</script>