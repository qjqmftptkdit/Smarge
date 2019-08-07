// 이미지 공개 라우터 초기화
module.exports = function(app)
{
    app.get('/showImage',function(req,res){

        var imagePath='';
        var imageName='';
        var imageDec='';
        var userName='';
        if(req.query.imageFile && /^[0-9a-z.]+$/.test(req.query.imageFile) && (new (require('../func/sqlManager'))).imageIsExist(req.query.imageFile)) 
        {
            var result = (new (require('../func/sqlManager'))).getImageInfo_2(req.query.imageFile);
            imagePath=req.query.imageFile;
            imageName = result[0].image_name;
            imageDec = result[0].image_dec;
            userName = result[0].user_name;
        }   
        else
        {
            res.redirect("/error?error=4");
            return;
        }

        var lis = `
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>myImage</title>
    <link rel="stylesheet" type="text/css" href="/css/myImage.css" />
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<div id=topI>
</div>
</div>

<div id="center">
    <ul style="font-size: x-large; color: blueviolet">
        User : ${userName}
        <li style="font-size: xx-large">${imageName}</li> <br>
        <img style="border-radius: 40px / 40px; width: 300px; height: 300px;"" src="/upload/${imagePath}">
        <li>${imageDec}</li><br>
    </ul>
</div>
</body>

</html>
        `;
        res.send(lis);
    });
}