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

            if(!req.query.qtype)
                (new (require('../func/sqlManager'))).increaseViewed(req.query.imageFile, Number(imageViewed)+1);
        }   
        else
        {
            res.redirect("/error?error=4");
            return;
        }
        
        var log = '';
        if(req.session.user && req.query.qtype)
        {
            if((new (require('../func/sqlManager'))).checkCheckList(req.query.imageFile, req.session.user.username))
            {
                if(req.query.qtype=="like")
                {
                    (new (require('../func/sqlManager'))).increaseLike(req.query.imageFile, Number(imageLike)+1)
                    imageLike = Number(imageLike)+1;
                    log = '<p style="color: blue; position: relative; top:50px;"><STRONG>>좋아요를 눌렀습니다 !<</STRONG></p>';
                }
                if(req.query.qtype=="dislike")
                {
                    (new (require('../func/sqlManager'))).increaseDislike(req.query.imageFile, Number(imageDislike)+1)
                    imageDislike = Number(imageDislike)+1;
                    log = '<p style="color: blue; position: relative; top:50px;"><STRONG>>싫어요를 눌렀습니다 !<</STRONG></p>';
                }
            }
            else
            {
                log = '<p style="color: red; position: relative; top:50px;"><STRONG>>이미 좋아요, 싫어요를 눌렀습니다 !<</STRONG></p>';
            }
        }
        else if(req.query.qtype)
        {
            log = '<p style="color: red; position: relative; top:50px;"><STRONG>>로그인 이후 이용가능한 서비스 입니다 !<</STRONG></p>';
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
        <li> likes : ${imageLike} <a href="/showSharedImage?qtype=like&imageFile=${imagePath}"> [ I like too ! ] </a> </li> <br>
        <li> dislikes : ${imageDislike} <a href="/showSharedImage?qtype=dislike&imageFile=${imagePath}"> [ I dislike too ! ] </a> </li> <br>
    </ul>
    ${log}
</div>
</body>

</html>
        `;
        res.send(lis);
    });
}