const statusModel = require('../models/statuses.model');

const create = async (req, res) => {
    if( !req.body.name ) return res.status(400).send({
        code: 101,
        message: 'Incomplete data',
    });

    const existingStatus = await statusModel.findOne({ name: req.body.name });

    if( existingStatus ) {
        if( existingStatus.user_id === req.user._id ) return res.status(400).send({
            code: 102,
            message: 'status already exists',
        });
    }

    const status = new statusModel({
        name    : req.body.name,
        status  : true,
        user_id : req.user._id,
    });

    const result = await status.save();

    if( !result ) return res.status(400).send({
        code: 103,
        message: 'An error ocurred creating status. Try again later',
    });

    return res.status(201).send({ data: status });

}
