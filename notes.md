# Logique graphQL

Je créé ma dataSource qui récupère ses dépendances par un système d'injection des dépendances. (dont le SQLclient)
Dans ApolloServeur, je définie le contexte de mes dataSources et mes dataSources qui sont injectées automatique dans mes resolvers, dans le paramètre "context".
"context" est donc le nom du paramètre qui sert à l'injection des dépendances.

Pour faire une translation avec la méthode REST, le resolver est l'équivalent du controller et le dataSource est l'équivalent du dataMapper.

## Résumé

On part d'un serveur express comme on l'a toujours fait, puis on conçoit un schéma qui décrit les données accessibles dans notre API, qui sert à la fois de documentation, de routing et de validation. (parce qu'on précise le type des données et si elles sont obligatoires ou non).
Une fois que l'on a créé notre premier schéma, on met en place notre "resolver" qui correspond au controller et qui détient la logique de récupération des données.
Pour finir, on réalise les dataSources équivalent au dataMapper, dont la principale différence est "l'injection des dépendances", a la création de l'apolloServeur graphQL, on précise les différents éléments (dépendances et services ect ...), et c'est apollo qui se charge de distribuer les dépendances à qui en a besoin.
Le principe de récupération des données repose sur un "cycle" qui permet de récupérer par exemple la liste des catégories puis les postes puis de ces postes, re récupérer les catégories ainsi de suite. (pratique pour le front !)

GraphQL sépare les requêtes de lecture des requêtes d'écriture (édition, suppression, création), les requêtes de lecture sont les Query et les requêtes d'écriture sont les Mutations.
(Le but est d'optimiser la gestion du cache).
