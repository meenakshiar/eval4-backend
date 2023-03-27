const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true, enum: ["Laptop", "Tablet", "Mobile"] },
    no_of_comments: { type: Number, required: true },
    userId: { type: String, required: true }
});
const Post = mongoose.model('post', UserSchema);
module.exports = { Post };