# Requête GraphQL

## Récupérations des categories

```graphql
{
  # On récupère toutes les catégories
  categories {
    route
    label
    # Pour chaque catégorie tous ses posts
    posts {
      id
      title
      content
      # Et on va imaginer un fronteux qui veut se simplifier la vie
      # Dans chaque posts il remet l'objet de la category
      category {
        label
        # Et les posts des cette category (pour faire une sections "Autre article sur le même sujet)
        posts {
          slug
          excerpt
        }
      }
    }
  }
}
```

## Un post by Id

```graphql
# On définit ici une requête de type "query"
# spoiler: on verra l'autre type juste après
# On donne un nom à cette requête (il y moyen de rappeler un requête par son nom si on veut refaire la même)
# Et on indique qu'elle va se servir de la variable id (ne pas oublier le $) qui est de type ID chez nous et qui est obligatoire.
query GetPostByID($id: ID!) {
  # Dans cette requête de type query on appelle le point d'entrée post
  # En lui passant le contenu de la variable
  post(id: $id) {
    slug
    title
    content
    excerpt
    category {
      label
      posts {
        title
        excerpt
      }
    }
  }
}
```

## Création de post

```graphQL
mutation CreateNewPost($slug: String!, $title: String!, $category_id: ID!, $content: String) {
  insertPost(slug: $slug, title: $title, category: $category_id, content: $content) {
    # On peut parcourir le graph de propriétés du retour de la requête
    id
    slug
    title
    excerpt
    content
    category {
      label
    }
  }
}
```