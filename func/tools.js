// 암호학적으로 안전한 30자리의 무작위 난수를 생성해서 반환시킨다.
module.exports.getSecureRandomVal =
function getSecureRandomVal()
{
    var secureRandom = require('secure-random');
    return secureRandom.randomArray(15).join('').substring(0,30);
}