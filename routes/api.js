var jwt = require('jsonwebtoken');
//const models = require('../models');
const router = require('express').Router();
const verifyJWT = require('../helpers/verifyJWT');

const avaliacao = require('../controllers/avaliacao');
const borda = require('../controllers/borda');
const cargo = require('../controllers/cargo');
const cliente = require('../controllers/cliente');
const combo = require('../controllers/combo');
const comboPizza = require('../controllers/comboPizza');
const comboProduto = require('../controllers/comboProduto');
const convenio = require('../controllers/convenio');
const cupom = require('../controllers/cupom');
const funcionario = require('../controllers/funcionario');
const idConvenioCliente = require('../controllers/idConvenioCliente');
const pedido = require('../controllers/pedido');
const pedidoPizza = require('../controllers/pedidoPizza');
const pedidoProduto = require('../controllers/pedidoProduto');
const pizza = require('../controllers/pizza');
const produto = require('../controllers/produto');
const sabor = require('../controllers/sabor');
const saborPizza = require('../controllers/saborPizza');
const usuario = require('../controllers/usuario');

router.get('/', function(req, res) {
    res.send();
});

try {

//---------------------------------------------------------------------------
    //app.use(verifyJWT);

//----------------ROTAS USER-------------------------------------------------
    router.get('/allUsuario', verifyJWT, usuario.getAllUsuario);
    router.get('/getUsuario', verifyJWT, usuario.getUsuario);
    router.post('/newUsuario', verifyJWT, usuario.newUsuario);
    router.put('/updateUsuario', verifyJWT, usuario.updateUsuario);
    router.delete('/deleteUsuario', verifyJWT, usuario.deleteUsuario);
    router.post('/newCliente', usuario.newCliente);

    router.post('/login', usuario.login);
    router.post('/alterarSenha', usuario.alterarSenha);

//----------------ROTAS CUPOM------------------------------------------------
    router.get('/cupom', verifyJWT, cupom.getCupom);

//----------------ROTAS CLIENTE----------------------------------------------
    router.get('/clientes', verifyJWT, cliente.getCliente);


//-----------------ROTAS BORDA------------------------------------------------
    router.get('/allBordas', verifyJWT, borda.getAllBorda);
    router.get('/borda', verifyJWT, borda.getBorda);
    router.post('/newBorda', verifyJWT, borda.newBorda);
    router.delete('/deleteBorda', verifyJWT, borda.deleteBorda);

//----------------ROTAS SABORES-----------------------------------------------

    
    
    
    
    
    
}
catch(e) {
    console.log(e);
}

module.exports = router;


//   curl --header "Content-Type: application/json" --request POST --data '{"descricao":"bordateste1","preco":"50"}' http://localhost:8080/newBora