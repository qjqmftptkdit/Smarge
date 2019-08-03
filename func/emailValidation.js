module.exports = class {
    constructor()
    {
        this._config = require("./config");
        
        this._gmail = this._config.gmail;
        this._gmail_password = this._config.gmail_password;
        this._host = this._config.host;
    }

    // 주어진 인증코드로 이메일 전송시키기
    sendValidationEmail(checkCode,To)
    {
        const nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: this._gmail,                  // gmail 계정 아이디를 입력
            pass: this._gmail_password          // gmail 계정의 비밀번호를 입력
            }
        });

        let mailOptions = {
            from: this._gmail,                  // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
            to: To ,                            // 수신 메일 주소
            subject: 'Smarge 인증 메일입니다.',  // 제목
            text: `http://${this._host}:3000/emailValidation?checkCode=${checkCode} 를 클릭하시면 인증이 완료됩니다 !`
        };

        transporter.sendMail(mailOptions, function(error, info){
        });
    }

    // checkCode로 이메일을 인증한다.
    verifyEmail(checkCode)
    {
        return (new (require('./sqlManager'))).verifyEmail(checkCode);
    }

}