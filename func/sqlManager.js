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
        this._connection.query("INSERT INTO accounts(user_name, user_email, user_password, user_checkCode) VALUES (?, ?, ?, ?);",
        [body.username, body.email, body.password, body.checkCode]);
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
}