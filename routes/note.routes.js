const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const shortid = require('shortid')
const {check, validationResult} = require('express-validator')
const Note = require('../models/Notes')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
const _ = require('lodash')
const mailer = require('../models/mailer')

router.post('/create', auth, async (req, res) => {
    try {
        const code = shortid.generate()
        const note = new Note({
            code, name: req.body.name, notetext: req.body.notetext, owner: req.user.userId,shared:[]
        })
        await note.save()
        res.status(201).json({ note })

    } catch (e) {
        res.status(500).json(e)
    }
})





router.post('/save', auth, async (req, res) => {
    try {
        console.log("saving")
        let doc = await Note.findOneAndUpdate({ _id: req.body.noteNameId }, { name: req.body.noteNameEdit, notetext: req.body.noteTextEdit, shared: [...req.body.users] });
        const noteToEdit = await Note.findById(req.body.noteNameId)
        console.log("saved:", noteToEdit)
        res.json(noteToEdit)
    } catch (err) {
        console.log("err",err)
        res.status(500).json({ err })
    }
})

router.post('/deleteNote', auth, async (req, res) => {
    try {
        Note.findByIdAndDelete(req.body.noteNameId, function (err, docs) {
            if (err) {

            }

        });

        res.json(req.body.noteNameId)
    } catch (err) {

        res.status(500).json({ err })
    }
})



router.get('/notes', auth, async (req, res) => {
    try {
        const notes = await Note.find({ owner: req.user.userId })
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.get('/shared_notes', auth, async (req, res) => {
    try {
        const notes = await Note.find({ shared:req.user.userId })
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})






router.get('/users', auth, async (req, res) => {
    try {
        console.log(req.user.userId)
        
        const users = await User.find({})
        
        console.log(_.findIndex(users, {id:req.user.userId}))
        users.splice(_.findIndex(users, (user)=>{return user._id==req.user.userId}),1)
        //console.log(users)
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})



router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.json(note)

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.post('/change_password',  
    [
        check('oldPass','Input correct oldPass').isLength({ min: 6 }),
        check('pass','Input correct pass').isLength({ min: 6 }),
        check('ConfirmPass','Input correct ConfirmPass').isLength({ min: 6 }),
    ],  auth,
    async (req, res) => {
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Incorrect login data'
            })
        }
        const{oldPass,pass,ConfirmPass}=req.body
        if(pass!==ConfirmPass){ return res.status(400).json({message:"Пароли не совпадают"})}
        console.log('change_password')
        console.log(req.user)
        const userToChange = await User.findById(req.user.userId)
        console.log(userToChange)
        const isMatch = await bcrypt.compare(oldPass, userToChange.password)
        if (!isMatch){
            return res.status(400).json({message: 'Старый пароль неправильный!'})
        }
        const hashedPassword =await bcrypt.hash(pass,12)
        let usr = await User.findOneAndUpdate({_id:req.user.userId}, {password:hashedPassword});
        
        
        res.status(200).json({message:"Пароль успешно изменён"})

    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router