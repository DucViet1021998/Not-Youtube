const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Models/user.model')

dotenv.config();


module.exports = {
    // [POST METHOD]  
    // user register
    async register(req, res) {
        try {
            const avatarUrl = req.files[0].link;

            // Find User exist in Database
            const username = req.body.username;
            const user = await UserModel.findOne({ username: username });
            if (!!user) return res.sendStatus(500);

            // Find Email exist in Database
            const emailClient = req.body.email;
            const email = await UserModel.findOne({ email: emailClient });
            if (!!email) return res.sendStatus(402);
            else {
                // Make Password Hashing and Save to Database
                const hashedPass = await bcrypt.hash(req.body.password, 10);
                await UserModel.create({
                    username: req.body.username,
                    email: req.body.email,
                    gender: req.body.gender,
                    password: hashedPass,
                    avatar: avatarUrl,
                    songs: [],
                });
                return res.sendStatus(200);
            }
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },


    // [POST METHOD]  
    // user login
    async login(req, res) {
        try {
            const username = req.body.username;

            // // Find User exist in Database
            const user = await UserModel.findOne({ username: username });


            if (!!user) {
                const passwordLogin = req.body.password;
                const passwordDB = user.password;

                // Check User PassWord and User Database PassWord
                const equalCompare = await bcrypt.compare(
                    passwordLogin,
                    passwordDB,
                );



                if (equalCompare === true) {
                    // Success Login makes AccessToken
                    const accessToken = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '10s', // Hết hạn sau 10s Login
                        },
                    );

                    // //  Make refreshToken and save to DB
                    const refreshToken = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.REFRESH_TOKEN_SECRET,
                    );

                    //Save Tokens to Database
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    user.save();

                    // Response Tokens to FrontEnd
                    return res.status(200).send({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                }

                if (equalCompare === false) {
                    return res.status(500).send('Your Password not compare!');
                }
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.send('Error!');
        }
    },



    // [GET METHOD] 
    // Get User khi vào router cần login
    async getUser(req, res) {
        const users = await UserModel.findOne({ username: req.user.username }).lean();
        res.status(200).send([users]);
    },


    // [POST METHOD] 
    // Refresh Token
    async refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;

        const user = await UserModel.findOne({ refreshToken: refreshToken });
        if (!refreshToken) return res.sendStatus(401);

        if (!user) return res.sendStatus(401);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) res.sendStatus(403);
            // console.log(err, data);

            const accessToken = jwt.sign(
                { username: data.username, id: data.id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '2s',
                },
            );

            res.status(200).send({ accessToken: accessToken });
        });
    },


    // [POST METHOD] 
    // User Logout
    async logout(req, res) {
        try {
            // Lấy refreshToken từ FE
            const refreshToken = req.body.refreshToken;

            // Tìm User từ freshToken
            const userDB = await UserModel.findOne({ refreshToken: refreshToken });
            if (!userDB) res.sendStatus(500);

            //Xoa user.accessToken va user.refreshToken
            userDB.accessToken = null;
            userDB.refreshToken = null;
            userDB.save();
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    },

    async userSongs(req, res) {
        try {
            // Client UserId
            const userId = req.headers.userid;

            // check UserId in DB
            const user = await UserModel.findById(userId).lean().populate('songs');

            res.status(200).send(user.songs);

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

}