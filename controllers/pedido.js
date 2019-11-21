const { pedido } = require('../models');
const { pedidoPizza } = require('../models');
var moment = require('moment');


async function statusSaiuParaEntrega(req, res) {

    try {

        await pedido.findAll({
            where: {
                idPedido: req.params.idPedido
            }
        })
        .then(async data => {
            data.status = 4;
    
            await pedido.update(data, {
                where: {
                    idPedido: req.body.idPedido
                }
            })
            .then(newData => {
                res.status(200).json(newData);      
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function statusPedidoEntregue(req, res) {

    try {

        await pedido.findAll({
            where: {
                idPedido: req.params.idPedido
            }
        })
        .then(async data => {
            data.status = 5;
    
            await pedido.update(data, {
                where: {
                    idPedido: req.body.idPedido
                }
            })
            .then(newData => {
                res.status(200).json(newData);      
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

    
}

async function newPedido(req, res) {

    try {

        let pedidoData = {
            clienteidCliente: req.body.idCliente,
            dataCriacao: moment().format(Date.now),
            entrega: req.body.entrega,
            status: 1
        };

        let pedidoPizzaArray = req.body.pizzas;

        await pedido.create(pedidoData)
        .then(async result => {

            let idPedido = result.idPedido;

            await pedidoPizzaArray.forEach(async pizza => {
                let pedidoPizzaData = {
                    pizzaIdPizza: pizza.idPizza,
                    pedidoIdPedido: idPedido,
                    quantidade: pizza.quantidade
                };

                await pedidoPizza.create(pedidoPizzaData)
                .then(newData => {
                    console.log("pedidoPizza criado: ", newData);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send(error);
                })

                res.status(200).json(result);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function updatePedido(req, res) {

    try {


         
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function deletePedido(req, res) {

    try {

        await pedido.destroy({
            where: {
                idPedido: req.params.idPedido
            }
        })
        .then(async deletedData => {
            await pedidoPizza.destroy({
                where: {
                    pedidoIdPedido: req.params.idPedido
                }
            })
            .then(otherDeletedData => {
                res.status(200).json(deletedData + otherDeletedData);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
         
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function getPedido(req, res) {

    try {

        await pedido.findAll({
            where: {
                idPedido: req.body.idPedido
            },
            include: [
                {
                    model: pizza
                },
                {
                    model: usuario
                }
            ]
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
         
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function getClientePedidos(req, res) {

    try {

        await pedido.findAll({
            where: {
                clienteIdCliente: req.body.idCliente
            },
            include: {
                model: pizza
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
         
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

module.exports = {
    statusSaiuParaEntrega,
    statusPedidoEntregue,
    newPedido,
    updatePedido,
    deletePedido,
    getPedido,
    getClientePedidos
}