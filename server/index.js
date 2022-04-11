const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { PORT } = require('./config/config');
const { auth } = require('./middlewares/auth');
const routes = require('./routes');

const app = express();

require('./config/mongoose')();
app.use(cookieParser());
app.use(cors({
    "origin": true,
    "credentials": true
}));

app.use(express.json());
app.use(auth);

app.use('/api', routes);

app.listen(PORT, console.log(`Listening on port http://localhost:${PORT}/ ! Now its up to you...`));