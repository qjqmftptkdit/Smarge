// 이미지 업로드 라우터 초기화
module.exports = function(app, upload)
{
    app.use('/uploadImage', upload.single('imgFile'), function(req,res){

        // 세션이 존재하지 않을 경우
        if(!req.session.user)
        {
            res.redirect("/error?error=1");
            return;
        }

        var errorLog = '';

        // POST 전송일 경우
        if(req.method == 'POST')
        {
            errorLog = (new (require('../func/uploadImage'))(req)).check() ; // 입력값 확인
            if (errorLog == "OK") // 검증을 통과함 
            {
                var newFileName = (new (require('../func/uploadImage'))(req)).activateImage() ; // 이미지 뒤에 적절한 확장자를 붙인다.
                (new (require('../func/sqlManager'))).saveNewImage(req.session.user.username, newFileName, req.body.imgName, req.body.imgDec); // 이미지 관련 정보를 저장한다.
                res.redirect("/myImage");
                return ;
            }
            else if(req.file)// 검증을 통과하지 못한 경우 -> 올려진 파일을 삭제한다.
                require('../func/fileManager').removeFile(req.file.filename) ; // 이미지 삭제
        }
        
        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>uploadImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<div id=topI>
<a href="/myImage"><font size=5><STRONG><U>나의 이미지</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/uploadImage" style="color:cornflowerblue"><font size=5><STRONG><U>이미지 올리기</U></STRONG></font></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/"><font size=5><STRONG><U>이미지 수정하기</U></STRONG></font></p></a>
<font size=5><STRONG>/</STRONG></font>
<a href="/destroySession"><font size=5><STRONG><U>로그아웃</U></STRONG></font></p></a>
</div>
</div>

<div id="center">
<form action"/uploadImage" method="POST" enctype="multipart/form-data">
<ul style="font-size: x-large">
    <li> <input type="text" size="50" placeholder="이미지 이름" style="font-size: x-large" name="imgName"> </li> <br>
    <li> 이미지 선택(jpg,png) : <input type="file" value="이미지 선택" style="font-size: x-large" name="imgFile"> </li> <br>
    <li><textarea cols="63" rows="10" style="font-size: x-large" placeholder="이미지에 대한 설명을 입력하세요 !" name="imgDec"></textarea></li><br>
    <li><input type="submit" value="이미지 업로드" style="font-size: x-large"></li>
</ul>
</form>
<p style="font-size: x-large; color:red;"><strong>${errorLog}</strong></p>
</div>

</body>

</html>
        `;
        res.send(lis);
    });
}