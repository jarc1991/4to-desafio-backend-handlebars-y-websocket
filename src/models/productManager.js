import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid'


export class ProductManager {

    constructor(file) {

        this.products = []
        this.file = file
    }

    async getProducts(limit){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 

        if (limit) {

            return products.slice(0, limit);

          } else {

            return products;

          }

    }

    async getProductsById (id){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        const product = products.find(prod => prod.id === id)
        return product
    
    }

    async addProduct(prod){

        const prods = JSON.parse(await fs.readFile(this.file, 'utf-8'))
        const existeProd = prods.find(producto => producto.code === prod.code)

        if (existeProd) {

            return false

        } else {

            //Acá debería ir prod.id = uuidv4()
            prods.push(prod)
            await fs.writeFile(this.file, JSON.stringify(prods))
            return true

        }

    }

    async updateProduct(id, {newTitle, newDescription, newThumbnail, newCode, newPrice, newStock } ){

        const requireproduct = await this.getProductsById(id)

        const product = {

            title: newTitle || requireproduct.title,
            description: newDescription || requireproduct.description,
            price: newPrice || requireproduct.price,
            code: newCode || requireproduct.code,
            stock: newStock || requireproduct.stock,
            thumbnail: newThumbnail || requireproduct.thumbnail, 
            id: id
        }

        const products = await this.getProducts()

        const index = products.findIndex(prod => prod.id == id)
        
        products.splice(index, 1, product)

        await fs.writeFile(this.file, JSON.stringify(products))
        
        /*const prods = JSON.parse(await fs.readFile(this.file, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)

        if (prod) {

            prod.title = product.title
            prod.description = product.description
            prod.price = product.price
            prod.stock = product.stock
            prod.thumbnail = product.thumbnail
            prod.code = product.code

            prods.push(prod)
            await fs.writeFile(this.file, JSON.stringify(prods))
            return true

        } else {

            return false

        }*/

    }

    async deleteProduct(id){

        const products = JSON.parse(await fs.readFile(this.file, 'utf-8')) 
        const product= products.find (prod => prod.id === id)

        if(product){

            await fs.writeFile(this.file, JSON.stringify(products.filter(producto => producto.id !== id)))

            return true
            
        }else{

            return false
        }


    }

}



