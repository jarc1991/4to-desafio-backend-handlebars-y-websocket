import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { routerProd } from './routes/products.routes.js';

const app = express()
const PORT = 8080

//Inicializamos el motor indicando con app.engine qué motor utilizaremos

app.engine('handlebars', handlebars.engine())

//Luego con app.set indicamos en qué parte del protecto estarán las vistas
//Se recomienda usar rutas absolutas

app.set('views', __dirname+'/views')

//Finalmente con app.set indicamos que el motor que ya inicializamos es el que queremos utilizar.
//Es importante ya que le decimos al servidor que cuando renderice sepa que debe hacerlo con el motor de handlebars

app.set('view engine', 'handlebars')

//seteamos de manera estatica la carpeta public

app.use(express.static(__dirname+'/public'))

app.use('/products', routerProd)

app.get('/', (req, res) => {

    let test = {
        name: "Gerson",
        last_name:"Serrano"
    }

    //res.render es nuestro nuevo metodo para renderizar plantillas y de compone de:
    //nombre de la platilla, objeto para reemplazar campos

    res.render('index',test)
})

const server = app.listen(PORT, ()=> {

    console.log (`SERVER IS RUNNING ON: http://localhost:${PORT}`)

})

server.on('error', (error) => console.log(error))
