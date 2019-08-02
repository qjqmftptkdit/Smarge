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
        this._mysql      = require('mysql');
        this._connection = this._mysql.createConnection({
            host     : this._host,
            user     : this._user,
            password : this._password,
            database : this._database
            });
    }

    // 데이터베이스에 새로운 계정을 추가시킨다.
    saveNewAccount(body)
    {
        this._connection.connect();
        this._connection.query("INSERT INTO accounts(user_name, user_email, user_password) VALUES (?, ?, ?);",
        [body.username, body.email, body.password], function(error, results, fields) {
            if(error) throw error;
            console.log(results);
        })
        this._connection.end();
    }
}