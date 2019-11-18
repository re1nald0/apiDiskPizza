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

}

async function newSabor(req, res) {

}

async function deleteSabor(req, res) {

}

module.exports = {
    getAllSabor,
    getSabor,
    newSabor,
    deleteSabor
}