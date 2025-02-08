import jwt from "jsonwebtoken"
export default class blogMiddleware {
    static async tokenVerified(req, res, next) {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error("token does not exist");
        }
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                throw new Error("invalid token");
            }
            //console.log(decoded);
            req.body.authorId = decoded._id //the _id refers to the user's _id field
        })
        next();
    }
}