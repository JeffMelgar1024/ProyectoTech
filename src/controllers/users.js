const connection = require('../connection');
const bcrypt = require('bcrypt');


const getUsers = (req, res) => {
    const { limit, page } = req.params;
    const offset = (page - 1) * limit;
    const sql = `select * from users limit ${limit} OFFSET ${offset}`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
}

const getOneUser = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    }); 
}


const postCreateUser = (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const regNum = new RegExp('^[0-9]+$');
    const regEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
    let data  = req.body;
    const { name, phone, username, email, born, password } = data;
    if(!name || !phone || !username || !email || !born || !password){
        res.status(500).send('Faltan datos');
    }else if(!regNum.test(data.phone)){
        res.status(500).send('El telefono debe ser numerico');
    }else if(!regEmail.test(data.email)){
        res.status(500).send('El email no es valido');
    }else{
        const selectSql = 'SELECT * FROM users';
       //data.password = bcrypt.hashSync(password, 10);
        connection.query(selectSql, (err, result) => {
            if (err) {
                res.status(500).send(selectSql,err);
            } else {
                const listUsers = result;
                const haveUsername = listUsers.find(user => user.username === username);
                const HaveEmail = listUsers.find(user => user.email === email);
                if(haveUsername)
                    res.status(500).send('El usuario ya existen');
                else if(HaveEmail)
                    res.status(500).send('El email ya existe');
                else{
                     connection.query(sql, data, (err, result) => {
                        if (err) {
                            res.status(500).send(sql,err);
                        } else {
                            console.log("usuario creado");
                            res.status(200).send(data);
                        }
                });
                }
            }
        });
    }
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    const sqlSelect = 'SELECT * FROM users where id = ?';
    const sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sqlSelect, id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.length === 0) {
                res.status(500).send('No existe el usuario');
            } else {
                connection.query(sql, id, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send({
                            msj: 'usuario eliminado',
                            id});
                    }
                });
            }
        }
    })
}

const UpdateUser = (req, res) => {
    const { id } = req.params;
    const sqlSelect = 'SELECT * FROM users where id = ?';
    const sql = 'UPDATE users SET ? WHERE id = ?';
    let data = req.body;
    const { name, phone, username, email, born, password } = data;
    const regNum = new RegExp('^[0-9]+$');
    const regEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
    if(!name || !phone || !username || !email || !born || !password){
        res.status(500).send('Faltan datos');
    }else if(!regNum.test(data.phone)){
        res.status(500).send('El telefono debe ser numerico');
    }else if(!regEmail.test(data.email)){
        res.status(500).send('El email no es valido');
    }else{
        connection.query(sqlSelect, id, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (result.length === 0) {
                    res.status(500).send('No existe el usuario');
                } else {
                    //data.password = bcrypt.hashSync(password, 10);
                    connection.query(sql, [data, id], (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send({
                                msj: 'usuario actualizado',
                                id});
                        }
                    });
                }
            }
        });
    }
}

module.exports = {
    getUsers,
    getOneUser,
    postCreateUser,
    deleteUser,
    UpdateUser
};