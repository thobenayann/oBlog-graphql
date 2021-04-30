// Equivalent du controller (et dataSource équivalent du dataMapper)

module.exports = {
    // On suit ici la structure du schéma
    // Mon schéma a un type query
    Query: {
        // Qui a une propriété "categories"
        // pour lui expliquer comment répondre à cette demande
        // je fais une fonction
        async categories(_, __, context) {
            return await context.dataSources.category.findAllCategories();
        },

        // le second paramètre correspond aux arguments passés à mon point d'entrée
        async post(_, args, context) {
            return await context.dataSources.post.findPostById(args.id);
        },

        async posts(_, __, context) {
            return await context.dataSources.post.findAllPosts();
        }
    },

    Mutation: {
        async insertPost(_, args, context) {
            return await context.dataSources.post.insertPost(args);
        },

        async deletePost(_, args, context) {
            return await context.dataSources.post.deletePost(args.id);
        }
    },

    Category: {
        // Le premier param des resolvers est le "parent"
        // Lorsque la requête demande les "posts" d'une "category"
        // Apollo va venir exécuter ce resolver afin de les récupérer
        // Pour que le resolver récupère les posts de la bonne category
        // il la passe en param en tant que "parent"
        async posts(parent, _, context) {
            // "parent" ici est un objet Category
            // il a une propriété id
            const categoryId = parent.id;
            return await context.dataSources.post.findPostsByCategoryId(categoryId);
        }
    },

    Post: {
        async category(post, _, context) {
            return await context.dataSources.category.findCategoryById(post.category_id);
        }
    }
}