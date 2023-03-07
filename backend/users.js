const express = require('express')
const app = express()
const multer = require('multer');
const router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const ImgurStorage = require('multer-storage-imgur');
const cors = require('cors');

const userModel = require('./Models/UserModel')


dotenv.config()

app.use(cors())
app.use(express.json())

const upload = multer({
    storage: ImgurStorage({ clientId: "51f37a263f2fa7c" })
})

router.post('/upload', (req, res) => {

    try {
        console.log(req)
        res.send('ok')

    } catch (error) {
        console.log(error);
        res.send("Error!")
    }
})



router.post('/login', async (req, res) => {
    try {
        const username = req.body.username

        // // Find User exist in Database
        const user = await userModel.findOne({ username: username })

        if (!!user) {
            const passwordLogin = req.body.password
            const passwordDB = user.password

            // Check User PassWord and User Database PassWord 
            const equalCompare = await bcrypt.compare(passwordLogin, passwordDB)
            if (equalCompare === true) {

                // Success Login makes AccessToken
                const accessToken = jwt.sign({ id: user.id, username: user.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1s" // Hết hạn sau 5s Login
                    })

                // //  Make refreshToken and save to DB
                const refreshToken = jwt.sign({ id: user.id, username: user.username },
                    process.env.REFRESH_TOKEN_SECRET
                )

                //Save Tokens to Database
                user.accessToken = accessToken
                user.refreshToken = refreshToken
                user.save()

                // Response Tokens to FrontEnd
                return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
            }

            if (equalCompare === false) {
                return res.status(500).send('Your Password not compare!')
            }
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.send('Error!')
    }
})




router.post('/register', upload.any('avatar'), async (req, res) => {
    try {
        const avatarUrl = req.files[0].link


        // Find User exist in Database
        const username = req.body.username
        const user = await userModel.findOne({ username: username })
        if (!!user) return res.sendStatus(500)


        // Find Email exist in Database
        const emailClient = req.body.email
        const email = await userModel.findOne({ email: emailClient })
        if (!!email) return res.sendStatus(402)


        else {

            // Make Password Hashing and Save to Database
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            await userModel.create({
                username: req.body.username,
                email: req.body.email,
                gender: req.body.gender,
                password: hashedPass,
                avatar: avatarUrl,
                songs: [],
            })
            return res.sendStatus(200)
        }




    } catch (error) {
        console.log(error);
        res.send("Error!")
    }
})



const checkToken = async (req, res, next) => {
    try {
        //Lay token tu header
        const accessToken = req.headers.authorization?.split(" ")[1];

        //Validate token -> parse payload
        const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        //Tim user co token
        const user = await userModel.findById(data.id).lean();
        if (!user) {
            res.sendStatus(401)
        }

        //Return User
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
};


// Get User khi vào router cần login
router.get("/", checkToken, async (req, res) => {

    const users = await userModel.findOne({ username: req.user.username }).lean();
    res.status(200).send([users]);
});


router.post("/refresh-token", async (req, res) => {

    // Lấy RefreshToken từ Client
    const refreshToken = req.body.refreshToken

    const user = await userModel.findOne({ refreshToken: refreshToken });
    if (!refreshToken) return res.sendStatus(401)

    if (!user) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {

        if (err) res.sendStatus(403)
        // console.log(err, data);

        const accessToken = jwt.sign({ username: data.username, id: data.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2s'
        })

        res.status(200).send({ accessToken: accessToken })
    })

});



router.post("/logout", async (req, res) => {

    try {
        // Lấy refreshToken từ FE
        const refreshToken = req.body.refreshToken

        // Tìm User từ freshToken
        const userDB = await userModel.findOne({ refreshToken: refreshToken })
        if (!userDB) res.sendStatus(500)

        //Xoa user.accessToken va user.refreshToken
        userDB.accessToken = null;
        userDB.refreshToken = null;
        userDB.save();
        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        res.status(500).send('error')
    }
});



router.get("/user-songs", async (req, res) => {
    try {
        // Client UserId 
        const userId = req.headers.userid

        // check UserId in DB
        const users = await userModel.findById(userId).lean().populate("songs");


        res.status(200).send(users.songs);
    } catch (error) {
        console.log(error);
        res.send('Error!')
    }

})



module.exports = router