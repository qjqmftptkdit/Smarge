module.exports = class {
    constructor(body)
    {
        this._body = body;
    }

    check()
    {
        // 필드 유효성 검사
        if(!this._check_isAllFilled(this._body)) return "비워진 값이 있습니다 !";
        if(!this._check_email(this._body)) return "이메일이 유효하지 않습니다 !";
        if(!this._check_password(this._body)) return "패스워드가 유효하지 않습니다 !";
        
        return "OK";
    }

    // 전부 채워졌는지 확인한다.
    _check_isAllFilled(body)
    {   
        return (body && body.email && body.password );
    }

    // 이메일 유효성 검사
    _check_email(body)
    {
            return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(body.email);
    }

    // 패스워드 유효성 검사
    _check_password(body)
    {
           return /[0-9]+/.test(body.password) && /[A-Za-z]+/.test(body.password) && /^[A-Za-z0-9]{6,12}$/.test(body.password);
    }
   
}