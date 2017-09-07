const path = require("path");
const appConfig = require(path.resolve('./config/app.js'));


module.exports = (express, app) => {
  const subpath = express();
  const swagger = require("swagger-node-express").createNew(subpath);
  app.use('/v1', subpath);
  app.use(express.static('dist'));

  swagger.setApiInfo({
    title: "UCME API",
    description: "UCME RESTful Web API",
    termsOfServiceUrl: "",
    contact: "developer@ucme.io",
    license: "",
    licenseUrl: ""
  });
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
  });

  swagger.configureSwaggerPaths('', 'api-docs', '');

  const applicationUrl = appConfig.url;
  console.info('API running on ' + applicationUrl);
  swagger.configure(applicationUrl, '1.0.0');
};