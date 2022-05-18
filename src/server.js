const app = require('./app');

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`APP listenner on port: ${PORT}`);
})

