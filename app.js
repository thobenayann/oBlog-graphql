require('dotenv').config();
const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const resolver = require('./resolver');
const client = require('./dataSource/client');
const dataSources = require('./dataSource');

const app = express();

// On va venir "créer" notre serveur GraphQL
// comme on créérais un router ou l'app express 
const graphQLServer = new ApolloServer({
    // On lui donne le schema
    typeDefs: schema,
    // et les resolvers
    resolvers: resolver,

    // J'injecte dans le "context" notre client sql
    context: () => {
        // cette méthode context renvoie un objet qui sera passé au DataSource
        // via leur méthode initialize (pour faire l'injection de dépendances)
        return {
            sqlClient: client
        };
    },

    // on donne nos dataSources à ApolloServeur
    // il va les "initialize" pour qu'elles récupère leurs dépendances
    // et il va les mettre à disposition de nos résolvers
    dataSources: () => {
        return dataSources;
    }
});

// Et ensuite on passe le middleware associé à express (chargé sur la route /graphQL)
app.use(graphQLServer.getMiddleware());

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on :', process.env.PORT);
});