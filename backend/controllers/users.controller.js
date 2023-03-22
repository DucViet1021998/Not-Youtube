const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Models/user.model')

dotenv.config();

module.exports = {

    // [POST METHOD]  
    // User register
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


            // Make Password Hashing and Save to Database
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            await UserModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
                avatar: avatarUrl,
                role: 'user',
                check: false,
                songs: [],
            });
            return res.sendStatus(200);

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },


    // [POST METHOD]  
    // User login
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
                    // Success Login creates Access Token by JWT
                    const accessToken = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '30s', // Expires after 30s of login
                        },
                    );

                    // Success Login creates Refresh Token by JWT
                    const refreshToken = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.REFRESH_TOKEN_SECRET
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
                    } else if (user.role === 'user') {
                        return res.status(200).send({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        });
                    } else return res.sendStatus(403)
                } else return res.status(400).send('Your Password not compare!');

            } else return res.sendStatus(404);

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },

    // [GET METHOD] 
    // Read information User after login success
    async getUser(req, res) {
        try {
            return res.status(200).send([req.user]);
        } catch (error) {
            res.sendStatus(400)
        }
    },


    // [POST METHOD] 
    // Refresh Token when AccessToken Expired
    async refreshToken(req, res) {
        try {
            let refreshToken = req.body.refreshToken;

            const user = await UserModel.findOne({ refreshToken: refreshToken });

            if (!user) return res.sendStatus(404);

            const accessToken = jwt.sign(
                { username: user.username, id: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '30s',
                },
            );


            res.status(200).send({ accessToken: accessToken });


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

    // [GET METHOD] 
    // Read user album
    async userSongs(req, res) {
        try {
            const user = await UserModel.findById(req.user._id).lean().populate('songs');
            const songs = user.songs.sort(() => (Math.random() > 0.5 ? 1 : -1));
            res.status(200).send(songs);

        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [GET METHOD] 
    //read user notifications
    async userSongsNotify(req, res) {
        try {
            const user = await UserModel.findById(req.user._id).lean().populate('songs');
            res.status(200).send(user.songs);
        } catch (error) {
            console.log(error);
            res.send('Error!');
        }
    },

    // [DELETE METHOD] 
    // Delete user 
    async userDelete(req, res) {
        try {
            // Check admin role
            if (!req.user.role === 'admin') return res.sendStatus(400)
            await UserModel.findById({ _id: req.headers.userid }).then(async (data) => {
                if (data.role === 'user') {
                    await UserModel.findOneAndDelete({ _id: data._id })
                    return res.sendStatus(200)
                }
                else return res.sendStatus(403)
            })
        } catch (error) {
            console.log(error);
            res.sendStatus(400)
        }
    },

    // [GET METHOD] 
    // Read all users
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