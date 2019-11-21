const { borda } = require('../models');

async function getAllBorda(req, res) {

    try {
        
        await borda.findAll({})
        .then(async result => {
            if(result.length <= 0) {

                res.status(404).send("Nao existem bordas cadastradas");
                //res.status(404).json({"message": "Nao existem bordas cadastradas"});
            }
            else {
                // result = JSON.stringify(result);
                // result = JSON.parse(result);
                // console.log(result);
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

async function getBorda(req, res) {

    try {

        await borda.findAll({
            where: {
                idBorda: req.body.idBorda
            }
        })
        .then(result => {
            if(result.length <= 0) {
                res.status(404).json({"message": "Nao foi possivel encontrar a borda desejada"});
            }
            else {
                res.status(200).json(result);
            }
        })
        .then(error => {
            res.status(500).send(error);
        });


    } catch(e) {
        console.log(e)
        res.status(500).send(e);
    }

}

async function newBorda(req, res) {

    try {
        await borda.findAll({
            where: {descricao: req.body.descricao}
        })
        .then(async result => {
            if(result.length > 0) {
                res.status(203).send("Ja existe bosta com essa descricao");
            }
            else {

                let newBorda = {
                    descricao: req.body.descricao,
                    preco: req.body.preco
                };

                await borda.create(newBorda)
                .then(data => {
                    res.status(200).json({mesage: "Borda criada com sucesso", data: data});
                })
                .then(error => {
                    res.json({error: error});
                })
            }
        })
        .then(error => {
            console.log(error)
            res.status(500).json({error: error});
        })

    } catch(e) {
        console.log(e)
        res.status(500).send(e);
    }
}

async function updateBorda(req, res) {

    try {

        await borda.findAll({
            where: {
                idBorda: req.body.idBorda
            }
        })
        .then(async data => {
            data.descricao = req.body.descricao;
            data.preco = req.body.preco;

            await borda.update(data, {
                where: {
                    idBorda: req.body.idBorda
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

async function deleteBorda(req, res) {

    try {

        let id = req.body.idBorda;

        borda.findAll({
            where: {
                idBorda: id
            }
        })
        .then(async result => {
            if(result.length == 1) {
                await borda.destroy({
                    where: {
                        idBorda: id
                    }
                })
                .then(deleted => {
                    res.status(200).json({"message": "Registro removido com sucesso", "data": deleted})
                })
            }
            else {
                res.status(404).send("Erro ao remover registro. Possiveis registros duplicados");
            }
        });

    } catch(e) {
        console.log(e)
        res.status(500).send(e);
    }
}

module.exports = {
    getAllBorda,
    getBorda,
    newBorda,
    updateBorda,
    deleteBorda
}