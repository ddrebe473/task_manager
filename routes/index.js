const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routeTasks = require('./tasks');
app.use('/api/tasks', routeTasks);

//server
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
