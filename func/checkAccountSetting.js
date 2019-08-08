module.exports = class {
    constructor(body)
    {
        this._body = body;
    }

    check_username()
    {
        // 필드 유효성 검사
        if(!this._check_isAllFilled(this._body)) return "비워진 값이 있습니다 !";
        if(!this._check_username(this._body)) return "유저이름이 유효하지 않습니다 ! (숫자,영어대소문자,'_'로 3~12자로 구성)";;

        // 중복 확인 검사
        if(this._checkDupUsername(this._body)) return "이미 존재하는 유저이름입니다.";

        return "OK";
    }

    // 전부 채워졌는지 확인한다.
    _check_isAllFilled(body)
    {   
        return (body && body.username);
    }

    // 유저이름 유효성 검사
    _check_username(body)
    {
        return /^[0-9a-zA-Z_]{3,12}$/.test(body.username);
    }

    // 유저이름 중복 검사
    _checkDupUsername(body)
    {
        return (new (require('./sqlManager'))).checkDupUsername(body.username); 
    }

}