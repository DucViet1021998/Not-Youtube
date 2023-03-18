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
            if (!!user) return res.sendStatus(400);

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
                    password: hashedPass,
                    avatar: avatarUrl,
                    role: 'user',
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
            const username = req.body.username.trim()

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
                            expiresIn: '30s', // Expires after 30s of login
                        },
                    );

                    // //  Make refreshToken and save to DB
                    const refreshToken = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.REFRESH_TOKEN_SECRET,
                        {
                            expiresIn: '40s', // Expires after 40s of login
                        },
                    );

                    //Save Tokens to Database
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    user.save();


                    // Response Tokens to FrontEnd
                    if (user.role === 'admin') {
                        return res.status(202).send({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        });
                    } else {
                        return res.status(200).send({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        });
                    }
                }

                if (equalCompare === false) {
                    return res.status(400).send('Your Password not compare!');
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
        try {
            return res.status(200).send([req.user]);
        } catch (error) {
            res.sendStatus(400)
        }
    },


    // [POST METHOD] 
    // Refresh Token
    async refreshToken(req, res) {
        try {
            let refreshToken = req.body.refreshToken;

            const user = await UserModel.findOne({ refreshToken: refreshToken });
            if (!user) return res.sendStatus(404);

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                console.log(data);
                if (err) return res.sendStatus(403);

                const accessToken = jwt.sign(
                    { username: data.username, id: data.id },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '30s',
                    },
                );
                refreshToken = jwt.sign(
                    { username: data.username, id: data.id },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: '40s',
                    },
                );
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                user.save()

                res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
            });

        } catch (error) {
            console.log(error);
            res.sendStatus(406);
        }
    },


    // [POST METHOD] 
    // User Logout
    async logout(req, res) {
        try {
            const user = req.user
            const userDB = await UserModel.findById({ _id: user._id });
            if (!userDB) res.sendStatus(400);

            //Delete accessToken and refreshToken
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
            const user = await UserModel.findById(req.user._id).lean().populate('songs');
            req.user.songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
            res.status(200).send(user.songs);

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    async userSongsNotify(req, res) {
        try {
            const user = await UserModel.findById(req.user._id).lean().populate('songs');
            res.status(200).send(user.songs);
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    async users(req, res) {
        try {
            const user = await UserModel.find({}).lean()
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

}