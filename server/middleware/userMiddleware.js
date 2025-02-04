import jwt from "jsonwebtoken"

export default class userMiddleware {
    static async tokenVerify(req, res, next) {
        let token = req.headers.authorization; //grab token from header
        if (!token) {
            return res.status(201).json({message:"token not found"})
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({message:"Token invalid"})
            }
            req.body.id = decoded._id; // "decoded" refers to the payload
            console.log("correct token!");
            next() //send to the next handler
        })
    }
}