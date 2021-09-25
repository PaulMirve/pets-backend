import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPUBLICKEY || "", {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`The token can't be generated`);
            } else {
                resolve(token);
            }
        });
    });
}
