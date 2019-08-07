module.exports = class {
    constructor(req)
    {
        this._req = req;
    }

    check()
    {
        // 필드 유효성 검사
        if(!this._check_isAllFilled(this._req)) return "비워진 값이 있습니다 !";
        if(!this._check_imgName(this._req)) return "이미지 이름이 유효하지 않습니다 ! (숫자,영대소문자,빈칸,_,(),?!로 3~20자로 구성)";
        if(!this._check_imgDec(this._req)) return "이미지 설명이 유효하지 않습니다 ! (숫자,영대소문자,빈칸,_,(),?!로 3~200자로 구성)";

        return "OK";
    }

    // 전부 채워졌는지 확인한다.
    _check_isAllFilled(req)
    {   
        return (req.body && req.body.imgName && req.body.imgDec);
    }

    // 이미지 이름 유효성 검사
    _check_imgName(req)
    {
        return /^[0-9a-zA-Z _()?!]{3,20}$/.test(req.body.imgName);
    }

    // 이미지 설명 유효성 검사
    _check_imgDec(req)
    {
        return /^[0-9a-zA-Z _()?!]{3,200}$/.test(req.body.imgDec);
    }
}