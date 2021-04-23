const client = require('./dataSource/client');

module.exports = {
    // On suit ici la structure du schéma
    // Mon schéma a un type query
    Query: {
        // Qui a une propriété "categories"
        // pour lui expliquer comment répondre à cette demande
        // je fais une fonction
        async categories() {
            const result = await client.query('SELECT * FROM category');
            return result.rows;
        }
    }
}