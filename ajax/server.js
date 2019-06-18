//server.js - arquivo responsavel para tratar das requisições e 
const bodyParser = require('body-parser') //requisições 
const express = require('express')
const app = express()

//middle é uma função que sera executado quando uma requisição chegar
app.use(express.static('.'))//dentro da pasta atual "." sirva os arquivos estaticos (arquivos css. js etc) - responsavel pela start dos arquivos
app.use(bodyParser.urlencoded({extended: true})) //se vier uma requisição de uma submite de um formulario
app.use(bodyParser.json()) //se vier um json na requisição

//UPLOAD DE ARQUIVO (Aula XMLHttpRequest2)
const multer = require('multer')//interpretando formulario do arquivo de upload

const storage = multer.diskStorage({//diskStorage - recebe um objeto, e serve para personalizar o arquivo e a pasta de arquivo (evitar arquivo com mesmo nome)
    destination: function(req, file, callback){
        callback(null, './upload') //Em que pasta o arquivo sera salvo, nesse exemplo na pasta './upload'
    },
    filename: function(req, file, callback){// escolhendo o nome do arquivo
        callback(null, `${Date.now()}_${file.originalname}`) //Salvar o arquivo com nome original + dada de upload
    }
})

const upload = multer({storage}).single('arquivo') //Recebe objeto storage , e diz que vai receber um input 'arquivo'

app.post('/upload', (req, res) => {
    upload(req, res, err =>{
        if(err){
            return res.end('Ocorreu um erro')
        }else{
            return res.end('Concluido com sucesso')
        }
    })
})

//FUNÇÂO FORMULARIO (Aula Fetch2)
app.post('/formulario', (req, res) =>{ //Tratar recebimento do formulario
    res.send({ //Vai responder com um objeto
        ...req.body, //...req. tudo que vir no body sera respondido de volta com um objeto, contendo oque foi mandado
        id:1 //Restornando o objeto mais um ID, como se fosse o banco
    })
})

//FUNÇÃO PAR OU IMPAR (Aula Axio2)
app.get('/parOuImpar', (req, res) =>{
    //Formas de receber dados do front pelo express
    //req.body - pega tudo que ta no body
    //req.query - interpreta parametros passados pela url do tipo get (dado= ?)
    //req.params - pega parametros ('parOuImpar/:numero')
    const par = parseInt(req.query.numero) % 2 === 0 //Verificando se é par, %2 = numero dividido por 2 = 0 é par
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

//INICIANDO SERVIDO
app.get('/teste', (req, res) => res.send('OK')) //se vier uma requisição tipo get na url "/teste" responde "ok" //TESTE
app.listen(8080, () => console.log('Executando...')) //Iniciando server na posta 8080