import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("token", authHeader);
        
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                msg: "Not authorized, please log in again",
                authHeader
            });
        }

        const token = authHeader.split(" ")[1];

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: tokenDecode.id,
            isAdmin: tokenDecode.isAdmin,
        };
        next();
    } catch (error) {
        console.log("error", error);
        return res.status(401).json({
            success: false,
            msg: error.message,
        });
    }
}

export default authUser;
