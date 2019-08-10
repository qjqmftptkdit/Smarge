// 커뮤니티에 공개된 이미지 상세정보 라우터 초기화
module.exports = function(app)
{
    app.get('/showSharedImage',function(req,res){

        var imagePath='';
        var imageName='';
        var imageDec='';
        var userName='';
        var imageLike=0;
        var imageDislike=0;
        var imageViewed=0;
        if(req.query.imageFile && /^[0-9a-z.]+$/.test(req.query.imageFile) && (new (require('../func/sqlManager'))).imageIsExist_s(req.query.imageFile)) 
        {
            var result = (new (require('../func/sqlManager'))).getImageInfo_3(req.query.imageFile);
            imagePath= req.query.imageFile;
            imageName = result[0].image_name;
            imageDec = result[0].image_dec;
            userName = result[0].user_name;
            imageLike = result[0].image_like;
            imageDislike = result[0].image_dislike;
            imageViewed = result[0].image_viewed;

            (new (require('../func/sqlManager'))).increaseViewed(req.query.imageFile, Number(imageViewed)+1);
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
    $(function(){
        $('#logo').mouseenter(function(){
            $('#logo').css('opacity','0.8');
        }).mouseleave(function(){
            $('#logo').css('opacity','1');
        });
    });
    </script>
</head>

<body>

<div id="top">
<a href="/"><img src="/source/logo.png" id="logo"></a>

<div id=topI>
</div>
</div>

<div id="center">
    <ul style="font-size: x-large; color: blueviolet">
        User : ${userName} / Viewed : ${imageViewed}
        <li style="font-size: xx-large">${imageName}</li> <br>
        <img style="border-radius: 40px / 40px; width: 300px; height: 300px;"" src="/upload/${imagePath}">
        <li>${imageDec}</li><br>
        <li> likes : ${imageLike} <a href="/showSharedImage"> [ I like too ! ] </a> </li> <br>
        <li> disSlikes : ${imageDislike} <a href="/showSharedImage"> [ I dislike too ! ] </a> </li> <br>
    </ul>
</div>
</body>

</html>
        `;
        res.send(lis);
    });
}