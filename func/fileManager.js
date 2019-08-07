// 특정 파일을 삭제시킨다.
module.exports.removeFile = function(fileName)
{
    var fs = require('fs');
    
    fs.exists(`./public/upload/${fileName}`,function(exists) {
        if(exists)
            fs.unlink(`./public/upload/${fileName}`, function(err){
            });
    });
}

// 파일 이름을 변경시킨다.
module.exports.renameFile = function(oldFileName, newFileName)
{
    var fs = require('fs');

    fs.exists(`./public/upload/${oldFileName}`,function(exists) {
        if(exists)
            fs.rename(`./public/upload/${oldFileName}`, `./public/upload/${newFileName}`, function(err){

            });
    });
}