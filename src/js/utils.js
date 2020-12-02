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

const prepPostsByDate = () => {
    const postsJSON = fs.readFileSync('./src/posts.json', 'utf8');
    const postsParsed = JSON.parse(postsJSON)
    const sortedByDate = postsParsed.sort((a, b) => b.date - a.date);
    return sortedByDate;
}

const prepPostsAtoZ = () => {
    const postsJSON = fs.readFileSync('./src/posts.json', 'utf8');
    const postsParsed = JSON.parse(postsJSON)
    const sortedAtoZ = postsParsed.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0
    });

    return sortedAtoZ;
}

module.exports = { prepPosts, prepPostsByDate, prepPostsAtoZ }

