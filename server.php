<meta charset="utf-8">
<?php

if(empty($_POST['name'])){
    die("滚");}

 $data=fopen('./func','r')or die("Unable to open file!");
 $asd=fread($data,filesize("./func"));
 $con=unserialize($asd);
 fclose($data);
 $data=fopen('./func','w');
 $con[$_POST['name']]=$_POST['code'];
//echo $_POST['code'];
//print_r($con);
fwrite($data,serialize($con));
fclose($data);
echo header("Location:snake.php");
?>