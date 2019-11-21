const { pizza } = require('../models');
const { sabor } = require('../models');
const { saborPizza } = require('../models');


async function getAllPizza(req, res) {

    try {

        pizza.findAll({
            include: {
                model: sabor
            }
        })
        .then(result => {
            if(result <= 0) {
                res.status(404).send("Nao existem pizzas cadastradas");
            }
            else {
                res.status(200).json(result);
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send(e);
        })


    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function getPizza(req, res) {

    try {

        let id = req.body.idPizza;

        pizza.findAll({
            where: {
                idPizza: id
            },
            include: {
                model: sabor
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send(e);
        })
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function newPizza(req, res) {

    try {

        console.log(req.body);

        let pizzaData = {
            tamanho: req.body.tamanho,
            descricao: req.body.descricao,
            bordaIdBorda: req.body.idBorda
        };
        let arraySabores = req.body.sabores;
        
        let responseData;
        let associativeData = new Array();

        console.log(pizzaData);

        await pizza.create(pizzaData)
        .then(async createdData => {
            responseData = createdData;

            await arraySabores.forEach(async saborId => {

                let saborDaPizza = {
                    pizzaIdPizza: createdData.idPizza,
                    saborIdSabor: saborId
                };
    
                await saborPizza.create(saborDaPizza)
                .then(async saborPizzaCreated => {
                    associativeData.push(JSON.parse(JSON.stringify(saborPizzaCreated)))
                    //Object.assign(associativeData, JSON.parse(JSON.stringify(saborPizzaCreated)));

                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send(error);
                })
            });

            Object.assign(responseData, associativeData);
            console.log(associativeData);

            res.status(200).json(responseData);
   
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

async function updatePizza(req, res) {

    try {

        

        

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function deletePizza(req, res) {

    try {

        let id = req.params.idPizza;

        await pizza.destroy({
            where: {
                idPizza: id
            }
        })
        .then(async deletedData => {
            let deletedId = deletedData.idPizza;

            await saborPizza.destroy({
                where: {
                    pizzaIdPizza: deletedId
                }
            })
            .then(associativeDeletedData => {
                res.status(200).json(deletedData + associativeDeletedData);
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

module.exports = {
    getAllPizza,
    getPizza,
    newPizza,
    updatePizza,
    deletePizza

}