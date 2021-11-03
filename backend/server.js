const fs = require(`fs`);
const _ = require(`lodash`);
const URL = require(`url`);

const express = require(`express`);
const compression = require(`compression`);
const bodyParser = require(`body-parser`);
const auth = require(`basic-auth`);
const cors = require(`cors`);

const config = require(`./config`);
const logger = require(`./modules/logger`);

const {formatTimespan} = require(`../shared/helpers/date-helpers`);

const app = express();

app.use(cors(config.http.cors))

let reqCount = 0;
app.use(function (req, res, next) {
  const url = URL.parse(req.url);
  req.id = ++reqCount;
  req.start = new Date();
  logger.info(`#${req.id} ${url.pathname} begin`);
  req.on(`close`, function () {
    logger.info(`#${req.id} ${url.pathname} ended in ${formatTimespan(Date.now() - req.start)}`);
  });
  next();
});

app.use(function (req, res, next) {
  const authorization = auth(req);
  if (/./.test(req.url)) {
    next();
    return;
  }
  if (!authorization || authorization.name !== config.http.authorization.name || authorization.pass !== config.http.authorization.pass) {
    res.status(401);
    res.append(`WWW-Authenticate`, `Basic`);
    res.end();
    return;
  }
  next();
});

app.use(compression({filter: compression.filter}));
app.use(express.static(`public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const matchController = require(`./controllers/match-controller`);
app.post(`/match-all`, matchController.matchAll);

// const server = require(`http`)
//   .createServer(app)
//   .listen(config.http.port, () => logger.info(`http://*:${config.http.port}/listen`));

const [serverKey, serverCert] = fs.readFileSync(`${__dirname}/../node_modules/webpack-dev-server/ssl/server.pem`, `utf-8`)
  .split(/(?<=-----)\s+(?=-----)/);

const server = require(`https`)
  .createServer({key: serverKey, cert: serverCert}, app)
  .listen(config.http.port, () => logger.info(`https://*:${config.http.port}/listen`));

module.exports = {app, server};
