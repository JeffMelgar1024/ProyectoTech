const connection = require('../connection');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const recuperatePass = (req, res) => {
    const { email } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? ';
    const meEmail = "macie.daniel30@ethereal.email";
    const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: meEmail,
                pass: 'rZ9urmd9jNWQr8MENB'
            }
        }
    );
    connection.query(sql, [email], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error consulta login',err);
        } else {
            if (rows.length > 0) {
                const dataToken = { 
                    id: rows[0].id,
                    email: rows[0].email
                }
                jwt.sign({dataToken}, 'secret-key', {expiresIn: "960s"}, (err, token) => {
                    if(err)
                        res.status(500).send('Error al generar token',err);
                    else{
                        var mailOptions = {
                            from: meEmail,
                            to: email,
                            subject: 'Recuperar contraseña',
                            text: `Hola, para recuperar tu contraseña ingresa al siguiente link: localhost:3000/email/recuperate/${token}`
                        }
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error);
                                res.status(500).send('Error al enviar correo',err);
                            }else{
                                res.status(200).send({
                                    msj: 'Correo enviado correctamente',
                                    token:`localhost:3000/email/recuperate/${token}`
                                });
                            }
                        });
                    }
                });
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        }
    });
}

const recuperatePassToken = (req, res) => {
    const { token } = req.params;
    jwt.verify(token, 'secret-key', (err, decoded) => {
        if(err){
            res.status(500).send('Error al validar token',err);
        }else{
            const { email } = decoded.dataToken;
            console.log(email);
            const sql = 'SELECT * FROM users WHERE email = ?';
            connection.query(sql, [email], (err, rows) => {
                if(err){
                    res.status(500).send('Error consulta recuperatePassToken',err);
                }else{
                    if(rows.length > 0){
                        res.status(200).send({
                            msj:  `Su contraseña es: ${rows[0].password}`
                        });
                    }else{
                        res.status(404).send('Usuario no encontrado');
                    }
                }
            })
            
        }
    });
}


module.exports  = {
    recuperatePass,
    recuperatePassToken
}