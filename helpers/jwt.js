const jwt = require('jsonwebtoken');
const SECRET_JWT= 'EstOdeb3DeSERCompLic4d02080';
const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            uid,
        };
    
        jwt.sign( payload, SECRET_JWT, {
            expiresIn: '12h'
        }, ( err, token) => {
            if( err ) {

                console.log( err );
                reject(err);
                
            } else {
                resolve( token );
            }
        });
    });

}

module.exports = {
    generarJWT
}