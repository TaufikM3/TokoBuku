import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authMiddleware = async (req, res, next) => {
    let token;

    // Cek jika ada token di cookies
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(400).json({
            message: "Anda tidak bisa mengakses halaman ini"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return res.status(401).json({
                message: "User tidak ditemukan atau telah dihapus"
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token yang dimasukkan salah"
        });
    }
};

export const permisionUser = (...roles) => {
    return(req, res, next,)=>{
        if(!roles.includes(req.user.role)){
            return next (res.status(403).json({
                message : 'anda tidak bisa mengakses halaman ini'
            }))
        }
        next ()
    }
}
