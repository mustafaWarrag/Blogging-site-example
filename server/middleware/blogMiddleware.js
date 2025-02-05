import jwt from "jsonwebtoken"
export default class blogMiddleware {
    static async tokenVerified(req, res, next) {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error("token does not exist");
        }
        let verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!verified) {
            throw new Error("token invalid");
        }
        jwt.decode(token, (err, decoded) => {
            if (err) {
                throw new Error("Decoding token failed");
            }
            req.body.authorId = decoded._id //the _id refers to the user's _id field
        })
        next();
    }
}