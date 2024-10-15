import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoute.js';
import {__dirname} from './utils.js'
import userRoutes from './routes/usersRoutes.js'
import homeRoutes from './routes/routes.js'


dotenv.config();


console.log('JWT_SECRET:', process.env.JWT_SECRET);


connectDB();


const app = express();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,  // Permitir acceso a propiedades heredadas
        allowProtoMethodsByDefault: true,     // Si también necesitas métodos
    }
}));



app.get('/', (req, res) => {
    res.redirect('/api')
});


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/api', homeRoutes)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
