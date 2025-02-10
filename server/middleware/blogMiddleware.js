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
            /*
            I use the token as both an authorization method
            and as an easy way to have access to the _id field of both
            blogs and users.
            That is the reason why most api calls have this request handler as middleware
            */
        })
        next();
    }
}