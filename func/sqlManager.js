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
    verifyLogin(email, password, res)
    {
        // salt 얻기
        this._result = this._connection.query("SELECT user_salt FROM accounts WHERE user_email=?;",[email]);
        this.salt = this._result[0].user_salt;

        // 데이터베이스에 존재하는지 확인
        var _connection = this._connection;
        require('crypto').pbkdf2(password, this.salt, 100000, 64, 'sha512', function(err, key){
            var result = _connection.query("SELECT user_available FROM accounts WHERE user_email=? AND user_password=?;",
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
                    console.log("PASS");
                }
            }
            else // 패스워드가 일치하지 않음
            {
                res.redirect("/login?error=1");
                return ;
            }

        });
    }
}