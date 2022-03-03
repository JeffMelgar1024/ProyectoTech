const connection = require('../connection');

const getAllProducts = (req, res) => {
    const { limit, page } = req.params;
    const offset = (page - 1) * limit;
    const sql = `select * from product limit ${limit} OFFSET ${offset}`;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error consulta getAllProducts',err);
        } else {
            res.status(200).send(rows);
        }
    });
}

const getProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM product WHERE id = ?';
    connection.query(sql, id, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error consulta getProduct',err);
        } else {
            res.status(200).send(rows);
        }
    });
}

const createProduct = (req, res) => {
    const { name, price, amount } = req.body;
    const data = req.body;
    const sql = 'INSERT INTO product SET ?';
    if(!name || !price || !amount){
        res.status(500).send('Faltan datos');
    }else{
        connection.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error consulta createProduct',err);
            } else {
                res.status(200).send({msj: 'Producto creado'});
            }
        });
    }
}

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, amount } = req.body;
    const data = req.body;
    const sql = 'UPDATE product SET ? WHERE id = ?';
    const sqlSelect = 'SELECT * FROM product where id = ?';
    if(!name || !price || !amount){
        res.status(500).send('Faltan datos');
    }else{
        connection.query(sqlSelect, id, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error consulta updateProduct',err);
            } else {
                if (result.length === 0) {
                    res.status(500).send('No existe el producto');
                } else {
                    connection.query(sql, [data, id], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Error consulta updateProduct',err);
                        } else {
                            res.status(200).send({msj: 'Producto actualizado'});
                        }
                    });
                }
            }
        });
    }
}

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const sqlSelect = 'SELECT * FROM product where id = ?';
    const sql = 'DELETE FROM product WHERE id = ?';
    connection.query(sqlSelect, id, (err, resultSelect) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error consulta deleteProduct',err);
        } else {
            if (resultSelect.length === 0) {
                res.status(500).send('No existe el producto');
            } else {
                connection.query(sql, id, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error consulta deleteProduct',err);
                    } else {
                        res.status(200).send({msj: 'Producto eliminado', result: resultSelect});
                    }   
                });
            }
        }
    });
}
        
const findProduct = (req, res) => {
    let { type ,name } = req.params;
    name = name.toLowerCase();
    let sql = 'SELECT * FROM product WHERE ';
    let flag = false;
    if(type === 'name'){
        sql += `name LIKE "%${name}%"`;
        flag = true;
    }else if(type === 'sku'){
        sql += `sku = ?`;
        flag = true;
    }else{
        res.status(500).send('Tipo de busqueda no valido');
    }
    if(flag){
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error consulta findProductForName',err);
            } else {
                res.status(200).send(rows);
            }
        });
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    findProduct
}
