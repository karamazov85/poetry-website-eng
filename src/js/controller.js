
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
// const prepPosts = require('./prepPosts/prepPost')
const fs = require('fs');
const marked = require('marked');


module.exports = function(app) {

    app.get('/', function(req, res) {
        const posts = prepPosts()
        res.render('index', { posts: posts });
    })

    app.get('/poem/:id', urlencodedParser, function(req, res) {
        const post = prepPosts(req.params.id)
        res.render('poem', { post: post });
    })

    app.get('/about', function(req,res){
        res.render('about');
    })

    function prepPosts(id) {
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
} 