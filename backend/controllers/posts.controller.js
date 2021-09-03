const statusModel = require('../models/statuses.model');
const postModel   = require('../models/posts.model');

const create = async(req, res) => {
    try {
        if( !req.body.title || !req.body.status_id ) return res.status(400).send({
            code: 101,
            message: 'Incomplete data',
        });

        const status = await statusModel.findById(req.body.status_id);
        
        if( !status ) return res.status(400).send({
            code: 102,
            message: 'Enter a valid status',
        });

        if( status.user_id != req.user._id ) return res.status(400).send({
            code: 102,
            message: 'Enter a valid status',
        });

        if( !status.status ) return res.status(400).send({
            code: 102,
            message: 'Status disabled',
        });

        const post = new postModel({
            title: req.body.title,
            text: req.body.text,
            status_id: req.body.status_id,
            user_id: req.user._id,
        });

        const result = await post.save();

        if( !result ) return res.status(400).send({
            code: 103,
            message: 'An error ocurred. Please try again later.',
        });

        return res.status(201).send({ data: post });

    } catch(e) {
        console.log(`posts controller create error ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred. Please try again later.',
        });
    }
}

const list = async(req, res) => {
    const posts = await postModel.find({ user_id: req.user._id });
    return res.status(200).send({ data: posts });
}

const postsByStatus = async(req, res) => {
    const posts = await postModel.find({
        status_id: req.params['status_id'],
        user_id: req.user._id
    });
    return res.status(200).send({ data: posts });
}

module.exports = { create, list, postsByStatus };
