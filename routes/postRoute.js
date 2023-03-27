const { Post } = require('../models/postModel');
const { Router } = require('express');
const PostRoute = Router();
const { Authenticator } = require('../middlewares/Authenticator');


PostRoute.get('/', async (req, res) => {
    try {
        let query = {};
        const { userId } = req.body;
        const { device = ["Laptop", "Tablet", "Mobile"] } = req.query;
        const { min, max } = req.query;
        query.no_of_comments = { $gte: min, $lte: max }
        const data = await Post.find({ $and: [{ userId }, { device: { $in: device } }] });
        res.status(200).json({ msg: "Your posts", movies: data });
    } catch (error) {
        res.status(401).send({ err: error.message });
    }
})

PostRoute.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const newData = await Post.create(data);
        res.status(200).send({ msg: "Post created", newData });
    } catch (error) {
        res.status(401).send({ "err": error.message });
    }
})

// PostRoute.get("/", Authenticator, async (req, res) => {
//     //   const query = req.query;
//     try {
//         const post = await PostModel.find({ author: req.body.author });
//         res.send(post);
//     } catch (error) {
//         res.send({ err: error.message });
//     }
// });

PostRoute.patch("/update/:id", Authenticator, async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.author;
    try {
        const user = await Post.find({ _id: postId });
        if (user[0].author == userId) {
            try {
                await Post.findByIdAndUpdate({ _id: postId }, req.body);
                res.send({ msg: "Posts has been Updated" });
            } catch (error) {
                res.send({ err: error.message });
            }
        } else {
            res.send({ msg: "You haven't access to update this" });
        }
    } catch (error) {
        res.send({ msg: error.message });
    }
});

PostRoute.delete("/delete/:id", Authenticator, async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.author;
    try {
        const user = await Post.find({ _id: postId });
        if (user[0].author == userId) {
            try {
                await Post.findByIdAndDelete({ _id: postId });
                res.send({ msg: "Post deleted" });
            } catch (error) {
                res.send({ err: error.message });
            }
        } else {
            res.send({ msg: "You haven't access to delete this" });
        }
    } catch (error) {
        res.send({ msg: error.message });
    }
});


PostRoute.get("/page/:page", async (req, res) => {
    const { page } = req.params;
    const limitPerPg = 2;
    const firstpg = (page - 1) * limitPerPg;
    try {
        const data = await Movie.find().skip(firstpg).limit(limitPerPg);
        res.status(200).send(data);
    } catch (error) {
        res.status(401).send({ "err": error.message });
    }
})

module.exports = {
    PostRoute,
};