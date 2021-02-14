const {Router} = require ('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const mailer = require('../models/mailer')
const passGen = require('password-generator')

const router = Router()



// /api/auth/register
router.post(
    '/register',
    [
        check('email','Что-то с почтой').isEmail(),
        check('password','Что-то с паролем').isLength({min:6})
    ], 
    async(req, res)=>{
    try{
        const errors=validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Некорректные данные при регистрации'
            })
        }
        const{email, password,name}=req.body
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message:'User exists'})
        }
        const hashedPassword =await bcrypt.hash(password,12)
        const user = new User({email, password:hashedPassword, name})
        await user.save()
        console.log("Омагад! Новый юзер!",name)
        
        res.status(201).json({message:'Пользователь стоздан!'})

    }catch(e){
        //console.log( `e^`,e)
        res.status(500).json({message:"Что-то пошло не так при регистрации"})
    }

})
// /api/auth/login
router.post(
    '/login', 
    [
        check('email','Input correct email').normalizeEmail().isEmail(),
        check('password','Input password').exists().isLength({min:1})
    ],
    async(req, res)=>{
    try{
        console.log("/login",req.body)
        const errors=validationResult(req)
        
            if(!errors.isEmpty()){
                //console.log("ошибки", errors)
                return res.status(400).json({
                    errors: errors.array(),
                    message:'Incorrect login data'
                })
            }
            
        const{email,password}=req.body
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: 'Incorrect pass'})
        }
        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}

        )
        return res.json({token,userId:user.id,userName:user.name})
        //console.log(token,userId)  
        

    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})

router.post('/send',  
    [
        check('email','Input correct email').normalizeEmail().isEmail(),
    ],  
    async (req, res) => {
    try {
        console.log('send')
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Incorrect login data'
            })
        }
        const{email,password}=req.body
        console.log(email)
        const user = await User.findOne({email})
        //console.log(user)
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        console.log("user1",user)
        const generatedPassword =passGen(6,false)
        let generatedPasswordHashed =await bcrypt.hash(generatedPassword,12)
        console.log(generatedPassword)
        console.log(generatedPasswordHashed)
        console.log("user2",user)
        let usr = await User.findOneAndUpdate({_id:user._id}, {password:generatedPasswordHashed});
        console.log("usr",usr)

        
        let mail={
            from: 'mr.morozov_ak@mail.ru', // sender address
            to: user.email, // list of receivers
            subject: "Напоминание пароля", // Subject line
            text: `Новый пароль: ${generatedPassword}`, // plain text body
            //html: "<b>Новый пароль: {generatedPassword}</b>", // html body

        }
        console.log('send2')
        mailer(mail)
        console.log('send3')
        res.status(200).json({message:"Пароль отправлен на почту"})

    } catch (e) {
        res.status(500).json(e)
    }
})





module.exports = router