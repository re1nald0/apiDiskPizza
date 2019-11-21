const { sabor } = require('../models');


async function getAllSabor(req, res) {

    try {

        await sabor.findAll({})
        .then(result => {
            if(result.length <= 0) {
                res.status(404).send("Nao foi encontrado nenhum registro");
            }
            else {
                res.status(200).json(result);
            }
        })
        .then(error => {
            res.status(500).send(error);
        })

    } catch(e) {
        console.log(e)
        res.status(500).send(e);
    }
}

async function getSabor(req, res) {

    try {

        sabor.findAll({
            where: {
                idSabor: req.body.idSabor
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

async function newSabor(req, res) {

    try {

        let saborData = {
            descricao: req.body.descricao,
            preco: req.body.preco,
            ingredientes: req.body.ingredientes,
            categoria: req.body.categoria,
            custo: req.body.custo
        };
    
        sabor.create(saborData)
        .then(result => {
            res.status.json({ "message": "sabor criado com sucesso", "data": result });
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

async function updateSabor(req, res) {

    try {

        let id = req.body.idSabor;

        sabor.findAll({
            where: {
                idSabor: id
            }
        })
        .then(async data => {
            data.descricao = req.body.descricao;
            data.preco = req.body.preco;
            data.ingredientes = req.body.ingredientes;
            data.categoria = req.body.categoria;
            data.custo = req.body.custo;

            sabor.update(data, {
                where: {
                    idSabor: id
                }
            })
            .then(updatedData => {
                req.status(200).json(updatedData);
            })
            .catch(e => {
                console.log(e);
                req.status(500).send(e);
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

async function deleteSabor(req, res) {

    try {

        let id = req.params.idSabor;

        sabor.findAll({
            where: {
                idSabor: id
            }
        })
        .then(async data => {
            if(data.length <= 0) {
                res.status(404).send("Nao existe sabor com este id");
            }
            else {
                sabor.destroy({
                    where: {
                        idSabor: id
                    }
                })
                .then(deletedData => {
                    res.status(200).json(deletedData);
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            }
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
    getAllSabor,
    getSabor,
    newSabor,
    updateSabor,
    deleteSabor
}