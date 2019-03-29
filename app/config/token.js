

var fs = require('fs');
var path = require("path");
const jwt = require('jsonwebtoken');
/*生成token*/
function  generateToken(data){
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, './pri.pem'));//私钥
    let token = jwt.sign({
        data,
        exp: created + 3600 * 24
    }, cert, {algorithm: 'RS256'});
    return token;
}
/*验证token */
function verifyToken(token){
    let cert = fs.readFileSync(path.join(__dirname, './pub.pem'));//公钥
    try{
        let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};

        let {exp = 0} = result,current = Math.floor(Date.now()/1000);
        if(current <= exp){
            res = result.data || 'legal';
        }
        else{
            res = 'expired'
        }
    }catch(e){

    }
    return res;

}
module.exports = {generateToken,verifyToken};
/*生成token*/ 