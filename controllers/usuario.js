const { usuario } = require('../models');
const { cliente } = require('../models');
const { funcionario } = require('../models');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function alterarSenha(req, res) {

    try {

        let usuarioEmail = req.body.email;
        let newEncryptedPass = bcrypt.hashSync(req.body.novaSenha, 8);

        usuario.findAll({
            where: {
                email: usuarioEmail
            }
        })
        .then(async result => {
            let parsedResult = JSON.stringify(result);
            parsedResult = JSON.parse(parsedResult);
            console.log(parsedResult[0].idUsuario);

            parsedResult[0].senha = newEncryptedPass;
            await usuario.update(parsedResult[0], {
                where: {
                    idUsuario: parsedResult[0].idUsuario
                }
            })
            .then(newData => {
                res.status(200).json({ "message": "Senha alterada com sucesso", "data": newData.email});
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            })
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
}

async function login(req, res) {

    try {

        if(req.body.email != undefined && req.body.senha != undefined) {
            await usuario.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(async result => {
                if(result.length <= 0) {
                    res.status(404).send("Nao existe usuario cadastrado com esse email");
                }
                else {

                    let resultSTRING = JSON.stringify(result);
                    let userData = JSON.parse(resultSTRING);
                    //console.log(userData);

                    if(bcrypt.compareSync(req.body.senha, userData.senha)) {
                        var token = jwt.sign({ "idUsuario": result.idUsuario, "email": result.email, "tipo": result.tipo }, process.env.SECRET, {
                            expiresIn: 86400
                        });
                        res.status(200).json({ token: token });
                    }
                    else {
                        res.status(401).send();
                    }
                }
            })
            .then(error => {
                res.status(203).send();
            })
        }
        else {
            res.status(500).send();
        }

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function getAllUsuario(req, res) {

    try {

        await usuario.findAll({})
        .then(result => {
            if(result.length <= 0) {
                res.status(404).send();
            }
            else {
                res.status(200).json(result);
            }
        })
        .then(error => {
            res.send(500).send(error);
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function getUsuario(req, res) {

    try {

        await usuario.findAll({
            where: {
                idUsuario: req.body.idUsuario
            }
        })
        .then(result => {
            if(result.length <= 0) {
                res.status(404).send();
            }
            else {
                res.status(200).json(result);
            }
        })
        .then(error => {
            res.status(500).send(error);
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function getFuncionario(req, res) {

    try {

        


    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }


}

async function getCliente(req, res) {

}

async function newUsuario(req, res) {

    try {

        console.log(req.body);

        await usuario.findAll({
            where: {
                email: req.body.email
            }
        })
        .then(async result => {
            if(result.length > 0) {
                res.status(203).send("Ja existe usuario com esse email");
            }
            else {

                let encryptedPass = bcrypt.hashSync(req.body.senha, 8);

                let newUser = {
                    idUsuario: req.body.idUsuario,
                    email: req.body.email,
                    senha: encryptedPass
                };

                if(req.body.funcionarioIdFuncionario != undefined) {
                    newUser.funcionarioIdFuncionario = req.body.funcionarioIdFuncionario;
                }

                if(req.body.clienteIdCliente != undefined) {
                    newUser.clienteIdCliente = req.body.clienteIdCliente;
                }

                await usuario.create(newUser)
                .then(data => {
                    res.status(200).json({"Mensagem": "Usuario criado com sucesso", "data": data});
                })
            }
        });

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function newCliente(req, res) {

    try {

        usuario.findAll({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if(result.length > 0) {
                res.status(203).send("Ja existe usuario cadastrado com esse email");
            }
        })

        let encryptedPass = bcrypt.hashSync(req.body.senha, 8);
        //Importante pois define a forma como serao armazenados os dados no request
        let usuarioData = {
            email: req.body.email,
            senha: encryptedPass,
        };
        let clienteData = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            endereco: req.body.endereco
        };
    
        await cliente.create(clienteData)
        .then(result => {
            usuario.findAll({
                where: {
                    idUsuario: usuarioData.email
                }
            })
            .then(async resultUsuario => {
                usuarioData.clienteIdCliente = result.idCliente;
                usuario.create(usuarioData)
                .then(data => {
                    res.status(200).json(data);
                })
            })
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function newFuncionario(req, res) {

    try {

        usuario.findAll({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if(result.length > 0) {
                res.status(203).send("Ja existe usuario cadastrado com esse email");
            }
        })

        let encryptedPass = bcrypt.hashSync(req.body.senha, 8);
        //Importante pois define a forma como serao armazenados os dados no request
        let usuarioData = {
            email: req.body.email,
            senha: encryptedPass,
        };
        let funcionarioData = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            endereco: req.body.endereco
        };
    
        await funcionario.create(funcionarioData)
        .then(result => {
            usuario.findAll({
                where: {
                    idUsuario: usuarioData.email
                }
            })
            .then(async resultUsuario => {
                usuarioData.funcionarioIdFuncionario = result.idFuncionario;
                usuario.create(usuarioData)
                .then(data => {
                    res.status(200).json(data);
                })
            })
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}

async function updateUsuario(req, res) {
    
    try {

        let updatedUserData = req.body.updatedUserData;
        let id = updatedUserData.idUsuario;

        let user = await usuario.findAll({
            where: {
                idUsuario: id
            }
        })
        .then(result => {
            if(result.length <= 0) {
                res.status(404).send("Nenhum usuario encontrado no banco");
            }
        });

        if(updatedUserData.email != undefined) {
            user.email = updatedUserData.email;
        }
        if(updatedUserData.funcionarioIdFuncionario != undefined) {
            user.funcionarioIdFuncionario = updatedUserData.funcionarioIdFuncionario;
        }
        if(updatedUserData.clienteIdCliente != undefined) {
            user.clienteIdCliente = updatedUserData.clienteIdCliente;
        }

        await usuario.update(user, {
            where: {
                idUsuario: id
            }
        })
        .then(result => {
            res.send(200).json(result);
        })
        .then(error => {
            res.status(500).send(error);
        })

    } catch(e) {
        console.log(e);
        res.status(500).send();
    }

}

async function deleteUsuario(req, res) {

    try {

        let id = req.usuario.idUsuario;

        usuario.findAll({
            where: {
                idUsuario: id
            }
        })
        .then(async result => {
            if(result.length == 1) {
                await usuario.destroy({
                    where: {
                    idUsuario: id
                    }
                })
                .then(deleted => {
                    res.status(200).json({"message": "Usuario removido com sucesso", "data": deleted})
                })
            }
            else {
                res.send(404).send("Erro ao remover registros.");
            }
        })

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }

}


module.exports = {
    alterarSenha,
    login,
    newFuncionario,
    newCliente,
    getAllUsuario,
    getUsuario,
    newUsuario,
    updateUsuario,
    deleteUsuario
}

//-----------------------------------MACROS HE HE HE HE HE------------------------
/*

try {

        
} catch(e) {
    console.log(e);
    res.status(500).send(e);
}

*/