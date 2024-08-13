import jwt from 'jsonwebtoken';

const protectRoute = async(req,res,next) => {
    const token = req.cookies.User;

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }

        req.admin = decoded; 
        next(); 
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired admin token", error: err.message });
    }
}

export default protectRoute;