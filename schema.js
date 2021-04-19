const { gql } = require('appolo-server-express');

const schema = gql`
# Ceci est le schéma de représentation de nos données.
# Il va servir de structure à notre API GraphQL

# On va commencer par définir des "entités"

"""
Un post sur le blog
"""
type Post {
    # Chaque propriété à un nom et un type
    # On peut rajouter à un type un modificateur
    id: ID! # Le modificateur ! indique que cette donnée est NOT NULL

    "Technical name for URL"
    slug: String!

    title: String!

    excerpt: String

    content: String

    # Je vais pouvoir décrire des liens entre mes entités
    category: Category!
}

"""
Une categorie regroupant plusieurs posts
"""
type Category {
    id: ID!

    label: String!

    route: String!

    posts: [Post]
    # Le modificateur [] indique que c'est une liste d'item de type Post
}

# On fini notre schéma par un type spécial
# Le type Query
# Il s'agira des points d'entrée pour demander des données
type Query {
    categories: [Category]
}
`;

// Le schéma a vraiment un rôle central dans les API GraphQL
// Car il sert à la fois
// - de documentation
// - de router
// - de validation

module.exports = schema;