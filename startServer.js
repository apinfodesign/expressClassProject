var app = require ('./app.js'); //attaches exported module "app" which includes express

app.listen(process.env.PORT || 3000, function () {
    console.log(' Listening on port 3000');
});