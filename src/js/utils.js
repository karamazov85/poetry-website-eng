const fs = require('fs');
const marked = require('marked');

const prepPosts = (slug) => {
        const postsJSON = fs.readFileSync('./src/posts.json', 'utf8');
        const postsParsed = JSON.parse(postsJSON)
       
        if(!slug) {
            return postsParsed;
        }
       
        const post = postsParsed.find(post => post.slug === slug);
        const contentHTML = marked(post.content)
        post.content = contentHTML;
       
        return post;
    }

module.exports = { prepPosts }

