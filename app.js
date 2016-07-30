const 	express = require('express'),
		app = express(),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		minifyHTML = require('express-minify-html'),
		morgan = require('morgan'),
    compression         = require('compression'),
    bodyParser = require('body-parser');


/**
 * configuracao das portas em ambientes DEV, TEST, HOMOlOGACAO, PRODUCAO
 * @type {[type]}
 */
const port = require('./config/env.json')[process.env.NODE_ENV || 'development'].PORT;

/**
 * configuracao server atributos
 */
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
//app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
                 saveUninitialized: true,
                 resave: true}));


app.use(function (req, res, next) {
    var maxAge = req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
   if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (maxAge / 1000));
    next();
});

app.set('etag', 'strong');

/**
 * templates 
 */
/*app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);*/

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**
 * ambiente publico 
 */
app.use(compression());
app.use(express.static(__dirname + '/public'));



/**
 * [public description] router site html 
 * @type {[html]}
 */
const public = express.Router();
require('./app/routes/site.js')(public);
app.use('/', public);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({message: 'Method not found 404'});
});


// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


app.listen(port);


