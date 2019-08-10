// 메인 홈페이지 라우터 초기화
module.exports = function(app)
{
    app.get('/',function(req,res){

    // 디폴트 로그
    var log = `<a href="/login" id="link1"><font size=5><STRONG><U>로그인</U></STRONG></font></a>
    <font size=5><STRONG>/</STRONG></font>
    <a href="/signup" id="link2"><font size=5><STRONG><U>회원가입</U></STRONG></font></p></a>`;
    var log2 = "업로드한 이미지를 공유하고, 사이트에 올릴 수 있습니다 !";

    // 세션이 존재할경우
    if(req.session.user)
    {
        log = `<a href="/accountSetting" id="link1"><font size=5><STRONG><U>계정설정</U></STRONG></font></a>
        <font size=5><STRONG>/</STRONG></font>
        <a href="/destroySession" id="link2"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>`;
        log2 = `${req.session.user.username}님 반갑습니다 !
        <a href="/myImage" style="color:blueviolet"><p> <font size=5><STRONG><U>[ 이미지 업로드 하기] </U></STRONG></font> </p></a>`;
    }

    // 디폴트 변수
    var limitImage = 0;
    var limitLog = `<a href="/?limitImage=0"><STRONG><이전 이미지<STRONG></a>`;        
        limitLog += `<a href="/?limitImage=1"><STRONG> 다음 이미지><STRONG></a>`;
    if(req.query.limitImage && /^[0-9]+$/.test(req.query.limitImage)) 
    {
        limitImage = req.query.limitImage; // 이미지 출력 범위 제한

        if(limitImage>0)
        {
            limitLog = `<a href="/?limitImage=${parseInt(limitImage)-1}"><STRONG><이전 이미지<STRONG></a>`;
            limitLog += `<a href="/?limitImage=${parseInt(limitImage)+1}"><STRONG> 다음 이미지><STRONG></a>`;
        }
    }

    // 커뮤니티에 공유된 이미지를 로드한다.
    var sharedImg = '<p style="font-size: x-large; color:blueviolet;"><strong>현재 커뮤니티에 공유된 이미지가 없습니다 !</strong></p>';
    var result = (new (require('../func/sqlManager'))).loadSharedImages(limitImage);
    if(result.length>0)
    {
        sharedImg = '';
        for(var i=0; i<result.length; i++)
        {
            var image_name = (result[i].image_name.length<17) ? result[i].image_name : (result[i].image_name.substr(0,16) + "...");
            sharedImg += `<a href="/showSharedImage?imageFile=${result[i].image_fileName}"><div><img src="/upload/${result[i].image_fileName}"><br>${image_name}<br>👍${result[i].image_like} / 👎${result[i].image_dislike} / 👋${result[i].image_viewed} </div></a>`;
        }
    }


        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>main</title>
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/myImage.js"></script>
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<form id="search">
    <input type="text" id="query">
    <input type="submit" id="queryButton" value=""/>
</form>

<div id=topI>
${log}
</div>
</div>

<div id="center">
<p style="color:blueviolet"> <font size=5><STRONG><U>${log2}</U></STRONG></font> </p>
${sharedImg}
<div style="text-align: center; width: 1115px;">
${limitLog}
</div>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}