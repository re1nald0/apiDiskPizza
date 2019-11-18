const { cupom } = require('../models');
const { cliente } = require('../models');

async function getCupom(req, res) {

    try {
        
        let cupons = await cupom.findAll({
            where: {
                idCupom: 1
            },
            include: {
                model: cliente
            }
        });
        let cupomList = JSON.stringify(cupons);

        let clientWithCupom = new Array(); 
        cupons.forEach(cupom => {
            clientWithCupom.push(cupom.cliente);    
        });
        let clientes = await cliente.findAll({});

        res.send(JSON.stringify(clientes));
        res.header("Content-Type", "application/json");
        res.status(200).send(cupons);

    }
    catch(e) {
        console.log("Erro ao buscar no banco");
        console.log("-----------------------------------------------------------");
        console.log(e);
    }

}

module.exports = {
    getCupom
}