import jwt from 'jsonwebtoken';

const generateTokenAndSendCookie = (user,res) => {

    return jwt.sign({user},process.env.SECRET_KEY,{
        expiresIn: '2h'
    });


};

export default generateTokenAndSendCookie;