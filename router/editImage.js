// 계정별 이미지 편집 라우터 초기화
module.exports = function(app)
{
    app.use('/editImage',function(req,res){
        // 세션이 존재하지 않을 경우
        if(!req.session.user)
        {
            res.redirect("/error?error=1");
            return;
        }

        var imagePath='';
        var imageName='';
        var imageDec='';
        var imageFileName='';
        // 이미지 파일 확인
        if(req.query.imageFile && /^[0-9a-z.]+$/.test(req.query.imageFile)) 
        {   
            if((new (require('../func/sqlManager'))).imageIsValid(req.session.user.username, req.query.imageFile))
            {
                imagePath = `/upload/${req.query.imageFile}`
                imageFileName = req.query.imageFile;
                var result = (new (require('../func/sqlManager'))).getImageInfo(req.session.user.username, req.query.imageFile);
                imageName = result[0].image_name;
                imageDec = result[0].image_dec;
            }
            else
            {
                res.redirect("/error?error=3");
                return;
            }
        }
        else
        {
            res.redirect("/error?error=3");
            return;
        }

        var errorLog='';
        // POST 요청인 경우
        if(req.method == 'POST')
        {
            // 이미지 정보 수정 요청인 경우
            if(req.query.qtype && req.query.qtype=='edit')
            {
                var result = (new (require('../func/editImage'))(req)).check() ; // 입력값 확인
                if(result == 'OK')
                {
                    (new (require('../func/sqlManager'))).editImageInfo(req.session.user.username, req.query.imageFile, req.body.imgName, req.body.imgDec);
                    imageName = req.body.imgName;
                    imageDec = req.body.imgDec;
                    
                    errorLog = `<p style="font-size: x-large; color:blue"><STRONG>성공적으로 수정했습니다 !</STRONG></p>`;
                }
                else
                {
                    errorLog = `<p style="font-size: x-large; color:red"><STRONG>${result}</STRONG></p>`;
                }
            } 
        }
        // 이미지 삭제 요청인 경우
        if(req.query.qtype && req.query.qtype=='del')
        {
            (new (require('../func/editImage'))(req)).deleteImage() ;
            res.redirect("/myImage?info=1");
            return ;
        }

        var config = require("../func/config");
        var host = config.host;

        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>myImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/editImage.js"></script>
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<div id=topI>
<a href="/myImage" style="color:blueviolet" id="link1"><font size=5><STRONG><U>나의 이미지</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/uploadImage" style="color:blueviolet" id="link2"><font size=5><STRONG><U>이미지 올리기</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/myImage?info=0" style="color:cornflowerblue"><font size=5><STRONG><U>이미지 수정하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/editImage?qtype=del&imageFile=${imageFileName}" style="color:red" id="link3"><font size=5><STRONG><U>이미지 삭제하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/destroySession" style="color:blueviolet" id="link4"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
</div>
</div>

<div id="center">
<ul style="font-size: x-large">
<form action="/editImage?qtype=edit&imageFile=${imageFileName}" method="POST">
    <li> <input type="text" size="50" placeholder="이미지 이름" style="font-size: x-large" name="imgName" value=${imageName}> </li> <br>
    <li><img style="border-radius: 40px / 40px; width: 300px; height: 300px;"" src="${imagePath}"></li>
    <li><textarea cols="63" rows="10" style="font-size: x-large" placeholder="이미지에 대한 설명을 입력하세요 !" name="imgDec">${imageDec}</textarea></li><br>
    <li><input type="submit" value="편집하기" style="font-size: x-large"></li>
    <li>이미지 공유 링크 : <br>
    <a href="/showImage?imageFile=${imageFileName}"> http://${host}:3000/showImage?imageFile=${imageFileName} </a></li>
</form>
</ul>
${errorLog}
</div>
</body>

</html>
        `;
        res.send(lis);
    });
}