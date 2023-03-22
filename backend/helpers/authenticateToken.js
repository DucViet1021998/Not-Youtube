const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../Models/user.model')

dotenv.config();

const authenticateToken = async (req, res, next) => {
    try {
        //Lay token tu header
        const accessToken = req.headers.authorization?.split(' ')[1];


        //Validate token -> parse payload
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        //Tim user co token
        const user = await UserModel.findById(data.id).lean();

        if (!user) res.sendStatus(403);
        // console.log(user);

        //Return User
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Error JWT');
    }
};


module.exports = authenticateToken