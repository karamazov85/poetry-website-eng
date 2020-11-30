const fs = require('fs');
const marked = require('marked');

module.exports = function prepPosts(id) {
        const postsJSON = fs.readFileSync('src/posts.json', 'utf8');
        const postsParsed = JSON.parse(postsJSON)
        console.log(postsParsed)
        if(!id) {
            return postsParsed;
        }
        console.log(id)
        const post = postsParsed.find(post => post.id === parseInt(id));
        const contentHTML = marked(post.content)
        post.content = contentHTML;
        console.log(post)
        return post;
    }


