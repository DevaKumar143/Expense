const jwt = require("jsonwebtoken");


const Auth = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please Authenticate  Using Valid Token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRTE);
        req.user = data.user;
        next();
    } catch (error) {
         return res.status(401).send({error: "Please Authenticate  Using Valid Token"});
    }
};

module.exports = Auth;