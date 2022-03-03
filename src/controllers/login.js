const connection = require('../connection');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error consulta login',err);
        } else {
            if (rows.length > 0) {
               // if(bcrypt.compareSync(password, rows[0].password, 10)){
                    const dataToken = { 
                        id: rows[0].id,
                        email: rows[0].email
                    }
                    jwt.sign({dataToken}, 'secret-key', (err, token) => {
                        if(err)
                            res.status(500).send('Error al generar token',err);
                        else{
                            res.status(200).send({
                                token
                            });
                        }
                    });
               /*  }else{
                    res.status(500).send('contraseña incorrecta');
                }  */
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        }
    });
}

module.exports  = {
    login
}