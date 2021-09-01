const userModel = require('../models/users.model');

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    if( !req.body.name || !req.body.email || !req.body.password ) return res.status(401).send({
        code: 101,
        message: 'Incomplete data',
    });

    const existingUser = await userModel.findOne({ email: req.body.email });

    if( existingUser ) return res.status(401).send({
        code: 102,
        message: 'User already exists',
    });

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new userModel({
        name     : req.body.name,
        email    : req.body.email,
        password : hash,
        status   : true,
    });

    const result = await user.save();

    if( !result ) return res.status(400).send({
        code: 104,
        message: 'An error ocurred. Please try again later',
    });

    return res.status(201).send({ data: user._id });
}

const login = async (req, res) => {
    try {
        if( !req.body.email || !req.body.password ) return res.status(401).send({
            code: 101,
            message: 'Incomplete data',
        });
    
        const user = await userModel.findOne({ email: req.body.email });
    
        if( !user ) return res.status(401).send({
            code: 102,
            message: 'Invalid credentials',
        });
    
        const isValidHash = await bcrypt.compare(req.body.password, user.password);
    
        if( !isValidHash ) return res.status(401).send({
            code: 103,
            message: 'Invalid credentials',
        });

        const token = user.generateJWT();

        return res.status(200).send({ data: token });

    } catch(e) {
        console.log(`Auth Controler Login Error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred. Please try again later',
        });
    }

}

module.exports = { register, login };
