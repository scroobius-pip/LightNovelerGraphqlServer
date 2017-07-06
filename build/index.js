'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _mock = require('./mock');

var _mock2 = _interopRequireDefault(_mock);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: _schema2.default,
    resolvers: _mock2.default
});

app.post('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function () {
    return {
        schema: executableSchema
    };
}));

app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
    endpointURL: '/graphql'

}));

app.listen(8080);
console.log("listening at 8080");