// 계정별 이미지 확인 라우터 초기화
module.exports = function(app)
{
    app.get('/myImage',function(req,res){
        // 세션이 존재하지 않을 경우
        if(!req.session.user)
        {
            res.redirect("/error?error=1");
            return;
        }

        // 디폴트 로그
        var log = '<p style="font-size: x-large; color:red;"><strong>현재 업로드된 이미지가 없습니다 !</strong></p>';
        var log2 = `<a href="/myImage?limitImage=0"><STRONG><이전 이미지<STRONG></a>`;
        log2 += `<a href="/myImage?limitImage=1"><STRONG> 다음 이미지><STRONG></a>`;
        var infoIog = '';

        // 디폴트 변수
        var limitImage = 0;
        if(req.query.limitImage && /^[0-9]+$/.test(req.query.limitImage)) 
        {
            limitImage = req.query.limitImage; // 이미지 출력 범위 제한

            if(limitImage>0)
            {
                log2 = `<a href="/myImage?limitImage=${parseInt(limitImage)-1}"><STRONG><이전 이미지<STRONG></a>`;
                log2 += `<a href="/myImage?limitImage=${parseInt(limitImage)+1}"><STRONG> 다음 이미지><STRONG></a>`;
            }
        }

        // 자신이 올린 이미지를 로드한다.
        var result = (new (require('../func/sqlManager'))).loadMyImages(req.session.user.username, limitImage);
        if(result.length>0)
        {
            log = '';
            for(var i=0; i<result.length; i++)
            {
                var image_name = (result[i].image_name.length<17) ? result[i].image_name : (result[i].image_name.substr(0,16) + "...");
                log += `<a href="/editImage?imageFile=${result[i].image_fileName}"><div><img src="/upload/${result[i].image_fileName}">${image_name}</div></a>`;
            }
        }

        // 알림 설정
        if(req.query.info && /^[0-9]+$/.test(req.query.info)) 
        {
            if(req.query.info==0)
                infoIog = `<p style="color:blueviolet;"><STRONG> 편집하고 싶은 이미지를 선택하세요 ! <STROUNG></p>`
            if(req.query.info==1)
                infoIog = `<p style="color:blueviolet;"><STRONG> 이미지가 성공적으로 삭제되었습니다 ! <STROUNG></p>`
        }

        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>myImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/myImage.js"></script>
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<div id=topI>
<a href="/myImage" style="color:cornflowerblue"><font size=5><STRONG><U>나의 이미지</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/uploadImage" style="color:blueviolet" id="link1"><font size=5><STRONG><U>이미지 올리기</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/myImage?info=0" style="color:blueviolet" id="link2"><font size=5><STRONG><U>이미지 수정하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/destroySession" style="color:blueviolet" id="link3"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
</div>
</div>

<div id="center">
${infoIog}
${log}

<div style="text-align: center; width: 1115px;">
${log2}
</div>

</div>
</body>

</html>
        `;
        res.send(lis);
    });
}