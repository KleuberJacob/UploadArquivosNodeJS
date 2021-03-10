const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')//Lib do proprio Node para pegar extensao de arquivos

app.set('view engine', 'ejs')

const storage = multer.diskStorage({
    destination: function(req, file, callback){//Funcao que informa o local de armazenamento dos arquivos 
        callback(null, 'uploads/')
    },
    filename: function(req, file, callback){//Funcao que nomeia o arquivo salvo com nome original do arquivo quando salvo
        callback(null, file.originalname + Date.now() + path.extname(file.originalname))
        //Gerando nome original + data em milisegundos + extensao(.jpeg/png) do arquivo original
    }
})

const upload = multer({storage})//Configuracao do multer que e um Middleware para executar as funcoes armazenadas
//na const storage

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', upload.single('file'), (req, res) => {//Utilizando o middleware para interceptar o arquivo recebido atraves do name(html)
    res.send('Arquivo recebido')
})

app.listen(8080, () => {
    console.log('Servidor Rodando!')
})