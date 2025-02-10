import jwt from "jsonwebtoken"

export default class userMiddleware {
    static async tokenVerify(req, res, next) {
        let token = req.headers.authorization; //grab token from header
        if (!token) {
            return res.status(201).json({message:"token not found"})
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({message:"Token invalid"});
            }
            req.body.id = decoded._id; // "decoded" refers to the payload
            console.log("correct token!");
            /*
            I use the token as both an authorization method
            and as an easy way to have access to the _id field of both
            blogs and users.
            That is the reason why most api calls have this request handler as middleware
            */
            next() //send to the next handler
        })
    }
    static async homeVerify(req, res, next) {
        /*
        throw away request handler in order to avoid receiving
        a 404 error when accessing server endpoint ("/home") 
        through the userRequests.tokenAuthentication
        */ 
        res.json({status:"valid token!"});
    }
}