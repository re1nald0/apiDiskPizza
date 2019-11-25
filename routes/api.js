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

//----------------SOME CONFIG------------------------------------------------
    //app.use(verifyJWT);

//----------------ROTAS USER-------------------------------------------------
    // router.get('/allUsuario', verifyJWT, usuario.getAllUsuario);
    // router.get('/getUsuario', verifyJWT, usuario.getUsuario);
    // router.post('/newUsuario', verifyJWT, usuario.newUsuario);
    // router.put('/updateUsuario', verifyJWT, usuario.updateUsuario);
    // router.delete('/deleteUsuario', verifyJWT, usuario.deleteUsuario);

    router.get('/getAllFuncionario', usuario.getAllFuncionario);
    router.get('/getAllCliente', usuario.getAllCliente);
    router.get('/getFuncionario', usuario.getFuncionario);
    router.get('/getCliente', usuario.getCliente);
    router.post('/newFuncionario', usuario.newFuncionario);
    router.post('/newCliente', usuario.newCliente);
    router.put('/updateFuncionario', usuario.updateFuncionario);
    router.put('/updateCliente', usuario.updateCliente);
    router.delete('/deleteFuncionario/:idUsuario', usuario.deleteFuncionario);
    router.delete('/deleteCliente/:idUsuario', usuario.deleteCliente);

    router.post('/login', usuario.login);
    router.post('/alterarSenha', usuario.alterarSenha);

//----------------ROTAS PEDIDO-----------------------------------------------
    router.get('/getPedido', pedido.getPedido);
    router.get('/getClientePedidos', pedido.getClientePedidos);
    router.post('/newPedido', pedido.newPedido);
    router.delete('/deletePedido', pedido.deletePedido);

    router.get('/statusSaiuParaEntrega/:idPedido', pedido.statusSaiuParaEntrega);
    router.get('/statusPedidoEntregue/:idPedido', pedido.statusPedidoEntregue);

//----------------ROTAS PIZZA------------------------------------------------
    router.get('/getAllPizza', pizza.getAllPizza);
    router.get('/getPizza', pizza.getPizza);
    router.post('/newPizza', pizza.newPizza);
    //router.put('/updatePizza', pizza.updatePizza);
    router.delete('/deletePizza/:idPizza', pizza.deletePizza);

//-----------------ROTAS BORDA-----------------------------------------------
    router.get('/allBordas', borda.getAllBorda);
    router.get('/borda', borda.getBorda);
    router.post('/newBorda', borda.newBorda);
    router.put('/updateBorda', borda.updateBorda);
    router.delete('/deleteBorda/:idBorda', borda.deleteBorda);

//----------------ROTAS SABORES----------------------------------------------
    router.get('/getAllSabor', sabor.getAllSabor);
    router.get('/getSabor', sabor.getSabor);
    router.post('/newSabor', sabor.newSabor);
    router.put('/updateSabor', sabor.updateSabor);
    router.delete('/deleteSabor/:idSabor', sabor.deleteSabor);

//----------------ROTAS CUPOM------------------------------------------------
    //router.get('/cupom', cupom.getCupom);
    
    

}
catch(e) {
    console.log(e);
}

module.exports = router;


//   curl --header "Content-Type: application/json" --request POST --data '{"descricao":"bordateste1","preco":"50"}' http://localhost:8080/newBorda