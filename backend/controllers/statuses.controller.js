const statusModel = require('../models/statuses.model');
const postModel   = require('../models/posts.model');

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

const list = async (req, res) => {
    const statuses = await statusModel.find({ user_id: req.user._id });
    return res.status(200).send({ data: statuses });
}

const del = async (req, res) => {
    try{
        const status = await statusModel.findById(req.params['_id']);
        
        if( !status ) return res.status(400).send({
            code: 102,
            message: 'Enter a valid status',
        });

        if( status.user_id != req.user._id ) return res.status(400).send({
            code: 102,
            message: 'Enter a valid status',
        });

        const posts = await postModel.find({ status_id: status._id });

        for(let post of posts ) {
            const resPost = await postModel.findByIdAndDelete(post._id);

            if(!resPost) return res.status(400).send({
                code: 104,
                message: `An error ocurred deleting post ${post._id}`,
            });
        }

        const result = await statusModel.findByIdAndDelete(req.params['_id']);

        if( !result ) return res.status(400).send({
            code: 103,
            message: 'An error ocurred. Please try again',
        });

        return res.status(200).send({ data: req.params['_id'] });
    
    } catch(e) {
        console.log(`statuses controller del error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred. Please try again',
        });
    }
}

module.exports = { create, list, del };
