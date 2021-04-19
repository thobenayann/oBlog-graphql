const { Pool } = require('pg');

const pool = new Pool();

// On va créer un wrapper
// Une "enveloppe" autour de la méthode query du pool
// On va s'en servir pour faire des consoles.log de nos requêtes
module.exports = {
    // pour pouvoir récupérer un nombre quelconque de paramètres
    // j'utilise le parametre du Rest qui me permet de récupérer
    // tous les paramètres passés, dans un tableau
    query(...params) { // je pack les paramètres en un seul tableau
        console.log('SQL :', ...params);
        console.count('Req SQL n°');

        // et ici, j'unpack le tableau en plusieurs arguments
        // pour appeler la méthode query exactement comme j'ai été appelé
        return pool.query(...params);
    }
};