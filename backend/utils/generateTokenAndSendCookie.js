import jwt from 'jsonwebtoken';

const generateTokenAndSendCookie = (user,res) => {

    const token = jwt.sign({user},process.env.SECRET_KEY,{
        expiresIn: '2h'
    });

    res.cookie("User",token,{
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"strict",
        secure:process.env.NODE_ENV || "production"
    });

};

export default generateTokenAndSendCookie;