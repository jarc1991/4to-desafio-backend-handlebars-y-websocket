import express from 'express';
import { ProductManager } from '../models/productManager.js';

const routerProd = express.Router()

const productManager = new ProductManager('src/products.json')

routerProd.get ('/', async (req, res) => {

    const { limit } = req.query
    const product = await productManager.getProducts()

    const products = product.slice(0, limit)

    res.status(200).json(products)

})

routerProd.get('/:pid', async(req, res) => {

    const  { pid } = req.params
    const product = await productManager.getProductsById(pid)

    if(product){

        res.status(200).json(product)

    }else{

        res.status(404).send('Producto no encontrado')
    }


})

routerProd.post('/', async(req, res) => {

    const confirmation = await productManager.addProduct(req.body)

    if(confirmation){

        res.status(201).render('El producto se ha creado')
    }else{

        res.status(400).render('Producto ya existente')
    }


})

/*routerProd.put('/:pid', async(req, res) => {

    const {pid} = req.params

    const confirmation = await productManager.updateProduct(pid, req.body)

    if(confirmation){

        res.status(200).send('El producto se ha actualizado')

    }else{

        res.status(404).send('Producto no encontrado')
    }

})

routerProd.delete('/:pid', async(req, res) => {

    const {pid} = req.params

    const confirmation = await productManager.updateProduct(pid)

    if(confirmation){

        res.status(200).send('El producto se ha eliminado')
        
    }else{

        res.status(404).send('Producto no encontrado')
    }

})*/

export { routerProd }