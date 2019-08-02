module.exports = class {
    constructor(body)
    {
        this._body = body;
    }

    check()
    {
        if(this._check_isAllFilled(this._body) == false) return "비워진 값이 있습니다 !";
        if(this._check_username(this._body) == false) return "유저이름이 유효하지 않습니다 ! (숫자,영어대소문자,'_'로 3~12자로 구성)";
        if(this._check_email(this._body) == false) return "이메일이 유효하지 않습니다 !";
        if(this._check_password(this._body) == false) return "패스워드가 유효하지 않습니다 ! (숫자와 영어대소문자를 포함해서 6~12자로 구성)";
        if(this._check_password_check(this._body) == false) return "패스워드와 패스워드확인이 일치하지 않습니다 !";
        return "OK";
    }

    // 전부 채워졌는지 확인한다.
    _check_isAllFilled(body)
    {   
        return (body && body.username && body.email && body.password && body.password_check );
    }

    // 유저이름 유효성 검사
    _check_username(body)
    {
        return /^[0-9a-zA-Z_]{3,12}$/.test(body.username);
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

    // 패스워드 확인 유효성 검사
    _check_password_check(body)
    {
        return body.password == body.password_check;
    }
    
}