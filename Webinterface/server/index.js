const port = 8000;

global.__basedir = __dirname;

var swaggerJSDoc = require('swagger-jsdoc');
const express = require("express"),
  router = express.Router();

  const app = express();

  // swagger definition
var swaggerDefinition = {
  info: {
    title: 'API Description for Tippkick-Uhr',
    version: '1.0.0',
    description: 'Endpoint Documentation',
  },
  host: 'localhost:8000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [ __basedir + '/controllers/**/*.js'],// pass all in array

  };

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: ["localhost:4200", "http://localhost:4200", "*"]
  })
);


const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const session = require("express-session");

app.use(
  session({
    secret: "askdfkja83821jaajiadf9201988gksiwvmso",
    headerName: "Authorization",
    cookie: {
      maxAge: 48 * 60 * 60 * 1000,
      secure: false,
      sameSite: false
    },
    saveUninitialized: false,
    resave: false
  })
);


const server = require('http').createServer(app);
const path = require('path');

server.listen(port, () => {
  console.log('Server hört auf Port: ' + port);
});

const io = require('socket.io')(server);

const version = "v1";
const rootpath = "/api/" + version + "/";

router.use(rootpath + "users", require("./controllers/users"));
router.use(rootpath + "live", require("./controllers/live")(io));


const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.mp4'
];

app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    console.log(__basedir);
    console.log(req.url);
    res.sendFile(path.resolve(path.join('dist/Webinterface', `${req.url}`)));
  } else {
    res.sendFile(path.resolve('dist/Webinterface/index.html'));
}
})

app.use(router);

const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function(req, res) {   res.setHeader('Content-Type', 'application/json');   res.send(swaggerSpec); });



io.on('connect', (socket) => {
  console.log('connected');
});

