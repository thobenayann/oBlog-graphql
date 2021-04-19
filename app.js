require('dotenv').config();
const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const resolver = require('./resolver');

const app = express();

// On va venir "créer" notre serveur GraphQL
// comme on créérais un router ou l'app express 
const graphQLServer = new ApolloServer({
    // On lui donne le schema
    typeDefs: schema,
    // et les resolvers
    resolvers: resolver
})

// Et ensuite on passe le middleware associé à express
app.use(express.json());
app.use(graphQLServer.getMiddleware());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});