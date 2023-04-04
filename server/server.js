const express = require('express');
const cors = require('cors');
const { billRouter } = require('./routes/bill.routes');

const port = 8000;


require('./config/mongoose.config');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/budgeter', billRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port} for requests to respond to.`)
})