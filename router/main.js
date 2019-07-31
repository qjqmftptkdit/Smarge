// 메인 홈페이지 라우터 초기화
module.exports = function(app)
{
    app.get('/',function(req,res){
        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>main</title>
    <style>
        html{
            background-image: url('/source/bg2.png');
        }
        #top {
            border: 1px solid black; padding: 10px;
            width: 1115px; height: 80px;
            background-image: url('/source/bg1.png');
            position: fixed;
            left:20%;
            z-index: 1;
            border-radius: 40px / 40px;
        }
        #logo {
            width: 250px; height: 80px;
            float: left;
        }
        #query {
            width: 500px; height: 50px;
            text-align: center;
            position: relative; top:-10px;
            font-size : large;
            color : blueviolet;
            font-family: "돋움", dotum, "굴림", gulim, arial, helvetica, sans-serif;
            border : 3px solid;
        }
        #queryButton{
            width: 100px; height: 58px;
            position: relative; top:14px; right: 7px;
            background-image: url('/source/query.png');
            background-size: 100px 50px;
            background-position: center center;
            border : 3px solid;
            color : blueviolet;
        }
        #search{
            float:left;
        }
        #topI{
            float:left;
            position: relative; left:20px; top:22px;
            color : blueviolet;
        }
        #center{
            border: 1px solid black; padding: 10px;
            width: 1115px; height: 1000px;
            background-image: url('/source/bg1.png');
            position: relative;
            left:19.7%;
            top: 120px;
            float: left;
            border-radius: 40px / 40px;
        }
        #center p{
            text-align: center;
            font-size: x-large;
        }
    </style>
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<form id="search">
    <input type="text" id="query">
    <input type="submit" id="queryButton" value=""/>
</form>

<div id=topI>
<a href="/"><font size=5><STRONG><U>로그인</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/"><font size=5><STRONG><U>회원가입</U></STRONG></font></p></a>
</div>
</div>

<div id="center">
<p> 업로드한 이미지를 공유하고, 사이트에 올릴 수 있습니다 ! </p>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}