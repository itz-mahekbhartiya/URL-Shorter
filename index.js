const express = require('express');
const { connectMongoDb } = require('./config');
const userRouter = require('./routes/router');
const urlSchema = require('./models/schema');


const app = express();
const port = 8000;
connectMongoDb('mongodb://127.0.0.1:27017/url-shortner-app')
    .then(() => console.log('Database connection established !!!'));

function currDateAndTime() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return `On ${day}-${month}-${year} at ${time}`;
}


// Middleware 
app.use(express.urlencoded({ extended: false }));

app.use('/', userRouter);

app.get('http://short.url/:id', async () => {
    const entry = await urlSchema.findOneAndUpdate({
        shortened_url: req.url,
    },
        {
            $push: {
                visit_history: currDateAndTime(),
            },
        }
    );

    res.send(entry.url);
});

app.listen(port, () => { console.log("Server started") });