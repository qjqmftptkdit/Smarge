module.exports = class {
    constructor()
    {
        this._config = require("./config");
        // 데이터베이스 설정
        this._host = this._config.host;
        this._user = this._config.user;
        this._password = this._config.password;
        this._database = 'smarge'; // 디폴트 값

        // 데이터베이스 연결 초기화
        this._mysql      = require('sync-mysql');
        this._connection = new this._mysql({
            host: this._host,
            user: this._user,
            password: this._password,
            database: this._database
          });
    }

    // 데이터베이스에 새로운 계정을 추가시킨다.
    saveNewAccount(body)
    {
        var _connection = this._connection;
        require('crypto').pbkdf2(body.password, body.salt, 100000, 64, 'sha512', function(err, key){
            _connection.query("INSERT INTO accounts(user_name, user_email, user_password, user_checkCode, user_salt) VALUES (?, ?, ?, ?, ?);",
            [body.username, body.email, key.join(''), body.checkCode, body.salt]);
        });
    }

    // 계정을 삭제시킨다.
    deleteAccount(password, email, res)
    {
        var fileM = require('./fileManager');

        // salt 얻기
        this._result = this._connection.query("SELECT user_salt FROM accounts WHERE user_email=?;",[email]);
        var salt = this._result[0].user_salt;

        // 데이터베이스에 존재하는지 확인
        var _connection = this._connection;
        require('crypto').pbkdf2(password, salt, 100000, 64, 'sha512', function(err, key){
            var result = _connection.query("SELECT user_id, user_name FROM accounts WHERE user_email=? AND user_password=?;",
            [email, key.join('')]);
            if(result.length != 0)
            {  // 로그인 검증 통과
                _connection.query("DELETE FROM accounts WHERE user_id=?",[result[0].user_id]); 

                var username = result[0].user_name;
                var resultImg = _connection.query("SELECT image_fileName FROM imageInfo WHERE user_name=?;",[username]);
                for(var i=0; i<resultImg.length; i++)
                {
                    fileM.removeFile(resultImg[i].image_fileName); 
                }

                _connection.query("DELETE FROM imageInfo WHERE user_name=?",[username]);
                res.redirect("/destroySession?log=1");
                return;
            }
            else // 패스워드가 일치하지 않음
            {
                res.redirect("/deleteAccount?log=1");
                return ;
            }
        });
    }

    // 유저이름 중복여부 확인
    checkDupUsername(username)
    {
        this._result = this._connection.query("SELECT user_id FROM accounts WHERE user_name=?;",[username]);
        return (this._result.length != 0);
    }

    // 이메일 중복여부 확인
    checkDupEmail(email)
    {
        this._result = this._connection.query("SELECT user_id FROM accounts WHERE user_email=?;",[email]);
        return (this._result.length != 0);
    }

    // 이메일을 인증시킨다.
    verifyEmail(checkCode)
    {
        this._result = this._connection.query("UPDATE accounts SET user_available = 1 WHERE user_checkCode = ?;",[checkCode]);
        return (this._result.changedRows == 1);
    }

    // 로그인 정보가 일치하는지 확인한다.
    verifyLogin(email, password, req, res)
    {
        // salt 얻기
        this._result = this._connection.query("SELECT user_salt FROM accounts WHERE user_email=?;",[email]);
        this.salt = this._result[0].user_salt;

        // 데이터베이스에 존재하는지 확인
        var _connection = this._connection;
        require('crypto').pbkdf2(password, this.salt, 100000, 64, 'sha512', function(err, key){
            var result = _connection.query("SELECT user_available, user_name FROM accounts WHERE user_email=? AND user_password=?;",
            [email, key.join('')]);

            if(result.length != 0)
            {
                if(result[0].user_available == 0) // 이메일 오류 발생
                {
                    res.redirect("/login?error=2");
                    return ;
                }
                else // 로그인 검증 통과
                {
                    req.session.user = {
                        "username" : result[0].user_name,
                        "email" : email
                    }
                    res.redirect("/");
                }
            }
            else // 패스워드가 일치하지 않음
            {
                res.redirect("/login?error=1");
                return ;
            }

        });
    }

    // 새로운 이미지 정보를 저장시킨다.
    saveNewImage(username, filename, imgName, imgDec)
    {
        this._connection.query("INSERT INTO imageInfo(user_name, image_fileName, image_name, image_dec) VALUES (?, ?, ?, ?);",
        [username, filename, imgName, imgDec]);
    }

    // 특정 유저의 이미지를 로드시킨다.
    loadMyImages(username, limitImage)
    {
        var result = this._connection.query("SELECT image_fileName, image_name FROM imageInfo WHERE user_name=? LIMIT ?, 12;",
        [username, limitImage*12]);
        return result;
    }

    // 이 이미지가 자신의 이미지가 맞는지 확인한다.
    imageIsValid(username, imgName)
    {
        this._result = this._connection.query("SELECT image_id FROM imageInfo WHERE user_name=? AND image_fileName=?;",[username, imgName]);
        return (this._result.length != 0);
    }

    // 이미지 정보를 얻는다.
    getImageInfo(username, imgName)
    {
        this._result = this._connection.query("SELECT image_name, image_dec FROM imageInfo WHERE user_name=? AND image_fileName=?;",[username, imgName]);
        return this._result;
    }

    // 이미지 정보를 수정한다.
    editImageInfo(username, imgName, image_name, image_dec)
    {
        this._result = this._connection.query("UPDATE imageInfo SET image_name=?, image_dec=? WHERE user_name=? AND image_fileName=?;",[image_name, image_dec, username, imgName]);
    }

    // 이미지 정보를 삭제한다.
    removeImageInfo(imgName)
    {
        this._result = this._connection.query("DELETE FROM imageInfo WHERE image_fileName=?",[imgName]);
    }

    // 이미지가 존재하는지 확인한다.
    imageIsExist(imgName)
    {
        this._result = this._connection.query("SELECT image_id FROM imageInfo WHERE image_fileName=?;",[imgName]);
        return (this._result.length != 0);
    }

    // 이미지 정보를 얻는다.
    getImageInfo_2(imgName)
    {
        this._result = this._connection.query("SELECT image_name, image_dec, user_name FROM imageInfo WHERE image_fileName=?;",[imgName]);
        return this._result;
    }

    // 유저 정보를 얻는다.
    getUserInfo(username)
    {
    this._result = this._connection.query("SELECT user_name, user_email, user_available FROM accounts WHERE user_name=?;",[username]);
    return this._result;
    }

    // 유저 이름을 변경시킨다.
    editUsername(username, username_new)
    {
    this._connection.query("UPDATE accounts SET user_name=? WHERE user_name=?;",[username_new, username]);
    this._connection.query("UPDATE imageInfo SET user_name=? WHERE user_name=?;",[username_new, username]);
    }

    // 패스워드를 변경한다.
    editPassword(email, password, password_new, res)
    {
         // salt 얻기
         this._result = this._connection.query("SELECT user_salt FROM accounts WHERE user_email=?;",[email]);
         var salt = this._result[0].user_salt;
 
         // 데이터베이스에 존재하는지 확인
         var _connection = this._connection;
         require('crypto').pbkdf2(password, salt, 100000, 64, 'sha512', function(err, key){
             var result = _connection.query("SELECT user_id FROM accounts WHERE user_email=? AND user_password=?;",
             [email, key.join('')]);
 
             if(result.length != 0)
             {  // 로그인 검증 통과
                require('crypto').pbkdf2(password_new, salt, 100000, 64, 'sha512', function(err, key){
                    _connection.query("UPDATE accounts SET user_password=? WHERE user_id=?;",[key.join(''), result[0].user_id]);
                });
                res.redirect("/accountSetting?log=2");
                return ;
             }
             else // 패스워드가 일치하지 않음
             {
                 res.redirect("/accountSetting?log=1");
                 return ;
             }
         });
    }
}