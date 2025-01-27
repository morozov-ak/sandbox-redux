const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const shortid = require('shortid')
const { check, validationResult } = require('express-validator')
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
            code, name: req.body.name, notetext: req.body.notetext, owner: req.user.userId, shared: []
        })
        await note.save()
        res.status(201).json({ note })

    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/save', auth, async (req, res) => {
    try {
        //console.log("saving")
        let doc = await Note.findOneAndUpdate({ _id: req.body.noteNameId }, { name: req.body.noteNameEdit, notetext: req.body.noteTextEdit, shared: [...req.body.users] });
        const noteToEdit = await Note.findById(req.body.noteNameId)
        res.json(noteToEdit)
    } catch (err) {
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
        const notes = await Note.find({ shared: req.user.userId })
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        users.splice(_.findIndex(users, (user) => { return user._id == req.user.userId }), 1)
        const trimmed = users.map(user => { return { _id: user._id, name: user.name } })
        res.json(trimmed)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})
router.get('/adminUsers', auth, async (req, res) => {
    try {
        const users = await User.find({})
        //users.splice(_.findIndex(users, (user)=>{return user._id==req.user.userId}),1)
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})
router.get('/adminNotes/:id', auth, async (req, res) => {
    try {
        //console.log("/adminNotes/:id", req.params.id)
        //const token = req.headers.authorization.split(' ')[1]
        if (req.user.admin) {
            const notes = await Note.find({ owner: req.params.id })
            //console.log(notes)
            res.json(notes)
        }

        //res.json(users)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.delete('/deleteUser/:id', auth, async (req, res) => {
    try {
        if (req.user.admin) {
            const notes = await Note.find({ owner: req.params.id })
            if (notes) {
                notes.map(async (note, index) => {
                    await Note.findByIdAndDelete(note._id, function (err, docs) {
                        if (err) { }
                    });
                    //console.log(note.name, "удалена!")
                })
            }

            User.findByIdAndDelete(req.params.id, function (err, docs) {
                if (err) { }
            });
            res.json({message: "пользователь удалён"})

        }
    } catch (err) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.delete('/deleteNote/:id', auth, async (req, res) => {
    try {
        if (req.user.admin) {
            await Note.findByIdAndDelete(req.params.id, function (err, docs) {
                if (err) { }
            });

        }
    } catch (err) {
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
        check('oldPass', 'Input correct oldPass').isLength({ min: 6 }),
        check('pass', 'Input correct pass').isLength({ min: 6 }),
        check('ConfirmPass', 'Input correct ConfirmPass').isLength({ min: 6 }),
    ], auth,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }
            const { oldPass, pass, ConfirmPass } = req.body
            //if(pass!==ConfirmPass){ return res.status(400).json({message:"Пароли не совпадают"})}
            if (pass !== ConfirmPass) { throw { error: "Пароли не совпадают" } }
            const userToChange = await User.findById(req.user.userId)
            const isMatch = await bcrypt.compare(oldPass, userToChange.password)
            if (!isMatch) {
                throw { error: "Старый пароль неправильный!" }
            }
            const hashedPassword = await bcrypt.hash(pass, 12)
            let usr = await User.findOneAndUpdate({ _id: req.user.userId }, { password: hashedPassword });
            //console.log(usr)
            res.status(200).json({ message: "Пароль успешно изменён!" })

        } catch (e) {
            res.status(500).json(e)
        }
    })

module.exports = router