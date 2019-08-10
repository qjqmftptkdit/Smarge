// 메인 홈페이지 라우터 초기화
module.exports = function(app)
{
    app.use('/',function(req,res){

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
        <a href="/myImage" style="color:blueviolet"><p> <font size=5><STRONG><U>[ 이미지 업로드 하기 ] </U></STRONG></font> </p></a>`;
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
    var errorLog = '';
    // get 요청인 경우
    if(req.method == 'GET')
    {
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
    }
    else if(req.method == 'POST' && req.query.qtype && req.query.qtype=="search") // post 요청인 경우
    {
        if(req.body.query)
        {
            if(/^[0-9a-zA-Z _()?!]{1,20}$/.test(req.body.query))
            {
                var result = (new (require('../func/sqlManager'))).loadSharedImages_q(limitImage, req.body.query);
                log2 = `${req.body.query}로 검색한 결과입니다 !
                <a href="/myImage" style="color:blueviolet"><p> <font size=5><STRONG><U>[ 이미지 업로드 하기 ] </U></STRONG></font> </p></a>`;
                if(result.length>0)
                {
                    sharedImg = '';
                    for(var i=0; i<result.length; i++)
                    {
                        var image_name = (result[i].image_name.length<17) ? result[i].image_name : (result[i].image_name.substr(0,16) + "...");
                        sharedImg += `<a href="/showSharedImage?imageFile=${result[i].image_fileName}"><div><img src="/upload/${result[i].image_fileName}"><br>${image_name}<br>👍${result[i].image_like} / 👎${result[i].image_dislike} / 👋${result[i].image_viewed} </div></a>`;
                    }
                }
            }
            else
            {
                errorLog = '<p style="color: red; position: relative; top:50px;"><STRONG>>잘못된 이미지 검색명 입니다 !<</STRONG></p>';
                sharedImg = '';
                limitLog = '';
            }
        }
        else
        {
            errorLog = '<p style="color: red; position: relative; top:50px;"><STRONG>>검색창에 아무것도 입력하지 않았습니다 ! !<</STRONG></p>';
            sharedImg = '';
            limitLog = '';
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

<form id="search" action="/?qtype=search" method="POST">
    <input type="text" id="query" name="query">
    <input type="submit" id="queryButton" value=""/>
</form>

<div id=topI>
${log}
</div>
</div>

<div id="center">
<p style="color:blueviolet"> <font size=5><STRONG><U>${log2}</U></STRONG></font> </p>
${errorLog}
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