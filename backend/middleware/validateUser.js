const userModel = require('../models/users.model');
const mongoose  = require('mongoose');

const user = async (req, res, next) => {
    const isValidId = mongoose.Types.ObjectId.isValid( req.user._id );
    
    if ( !isValidId ) return res.status(401).send({
        code: 104,
        message: 'Invalid user',
    });

    const user = await userModel.findById( req.user._id );

    if( !user ) return res.status(400).send({
        code: 101,
        message: 'Invaliduser',
    });

    if( !user.status ) return res.status(400).send({
        code: 101,
        message: 'Invaliduser',
    });    

    next();
}

module.exports = user;
