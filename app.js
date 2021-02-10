const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()


app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/note',require('./routes/note.routes'))



const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        app.listen(PORT, ()=> console.log(`app started ${PORT}`))
    }catch(e){
        console.log('Server Error', e.message)
        process.exit(1)

    }

}
start()