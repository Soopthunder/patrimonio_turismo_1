const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy([
        '/api',
        '/imagenes-servicios',
        '/archivos-destinos',
        '/imagenes-banners',
        '/imagenes-galeria',
        '/imagenes-operadores',
        '/catalogos'
    ], { target: 'http://localhost:5000' }));
}