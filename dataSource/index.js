const CategoryDataSource = require('./categoryDataSource');
const PostDataSource = require('./postDataSource');

module.exports = {
    category: new CategoryDataSource(),
    post: new PostDataSource()
}