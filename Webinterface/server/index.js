const port = 8000;


const express = require("express"),
  router = express.Router();

  const app = express();

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: ["localhost:4200", "http://localhost:4200", "*"]
  })
);

global.__basedir = __dirname;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const db = require('./database/db');
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

server.listen(port, () => {
  console.log('Server hört auf Port: ' + port);
});

const io = require('socket.io')(server);

const version = "v1";
const rootpath = "/api/" + version + "/";

router.use(rootpath + "users", require("./controllers/users"));
router.use(rootpath + "live", require("./controllers/live")(io));

app.use(router);

io.on('connect', (socket) => {
  console.log('connected');
});
