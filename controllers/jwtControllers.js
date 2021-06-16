import jwt from 'jsonwebtoken'
import User from "../models/adminSchema.js";
import bcrypt from "bcrypt";



export const generateAccessToken = (password) => {
    return jwt.sign(password, process.env.TOKEN_SECRET, { expiresIn: '4h' });
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        // console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

export const getToken = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            const token = generateAccessToken({ validPassword });
            res.status(200).json(token);
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }

}

export const createNewAdmin = async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    // createing a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
}