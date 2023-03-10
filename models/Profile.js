const { Schema, model } = require('mongoose')
const ProfileSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    adress: String,
    phone: Number,
   
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }


}, { timestamps: true })

const Profile = model('Profile', ProfileSchema)
module.exports = Profile