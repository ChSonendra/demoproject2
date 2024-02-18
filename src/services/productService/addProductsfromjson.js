const products = require('./producsts.json')
const productService = require('../../services/productService/productService')

async function insertProduct() {
    try {
 for (item in products) {
   const res = await productService.addProductToProducts(products[item]);
   console.log("res == product added ",item,products[item].name)
 }   
}
catch (error) {
    console.log("error is occuring == in product adding")
}
}
insertProduct()