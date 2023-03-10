const express = require('express')
const Post = require('./models/Post')
const Profile = require('./models/Profile')
const userRouter = express.Router()
const User = require('./models/User')


// add user 

userRouter.post('/', async (req, res) => {


    const user = new User(req.body)

    try {
        const result = await user.save()
        res.status(200).send(result)

    }
    catch (err) {
        res.status(500).send({ message: err.message })

    }


})

//  add profile 

userRouter.post('/profile/:id', async (req, res) => {
    const userId = req.params.id
    console.log(userId)



    const profile = new Profile({
        title: req.body.title,
        adress: req.body.adress,
        phone: req.body.phone,
        posts: [],
        user: userId


    })

    try {
        const result = await profile.save()
        const update = await User.findByIdAndUpdate({ _id: userId }, { $set: { profile: result._id } })

        res.status(200).send(result)

    }
    catch (err) {
        res.status(500).send({ message: err.message })

    }


})



userRouter.post('/addPost/:id', async (req, res) => {
    const profileId = req.params.id



    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        profile: profileId
    })

    try {
        const result = await post.save()
        const update = await Profile.findOneAndUpdate({ _id: profileId }, {
            $push: {
                posts: result._id

            }
        })

        res.status(200).send(result)

    }
    catch (err) {
        res.status(500).send({ message: err.message })

    }


})


// get data 
userRouter.get('/', async (req, res) => {
    try {


        // const result = await User.find({}).select('name -_id')
        // const result = await User.find({}).populate({path:'profile',select:"title"})
        const result = await User.find({}).populate('profile')
        for (let doc of result) {
            await Profile.populate(doc.profile, { path: 'posts' })
        }
        res.send(result)


    }
    catch (err) {
        res.status(500).send(err)



    }




})


module.exports = userRouter




