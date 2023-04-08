var config = require('./databaseConfig');
const sql = require('mssql');


async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Products");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getOrder(productId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, productId)
            .query("SELECT * from Products where ProductId = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addOrder(product) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('ProductId', sql.Int, product.ProductId)
            .input('ProductName', sql.NVarChar, product.ProductName)
            .input('ProductPrice', sql.Float, product.ProductPrice)
            .input('ProductViewer', sql.Int, product.ProductViewer)
            .input('Quantity', sql.Int, product.Quantity)
            .input('ProductCategory', sql.Int, product.ProductCategory)
            .input('Date', sql.DateTime, product.Date)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}






module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder
}