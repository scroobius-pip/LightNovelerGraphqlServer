'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _opticsAgent = require('optics-agent');

var _opticsAgent2 = _interopRequireDefault(_opticsAgent);

var _graphqlErrors = require('graphql-errors');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('uncaughtException', function (err) {
  console.log(err.stack);
});
// import mock from './mock'


var app = (0, _express2.default)();
var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default
});
// maskErrors(executableSchema)
_opticsAgent2.default.instrumentSchema(executableSchema);
app.use(_opticsAgent2.default.middleware());
app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (req) {
  return {
    schema: executableSchema,
    context: { opticsContext: _opticsAgent2.default.context(req) }
  };
}));

app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
  endpointURL: '/graphql'

}));

app.listen(8080);
console.log('listening at 8080');