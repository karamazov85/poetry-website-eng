const utils = require('./utils');

module.exports = function(app) {

    app.get('/', (req, res) => {
        const posts = utils.prepPosts()
        res.render('index', { posts: posts });
    })

    app.get('/sort/most-recent', (req, res) => {
        const posts = utils.prepPostsByDate();
        res.render('index', { posts: posts });
    })

    app.get('/sort/a-z', (req, res) => {
        const posts = utils.prepPostsAtoZ();
        res.render('index', { posts: posts });
    })

    app.get('/poem/:slug', (req, res) => {
        const post = utils.prepPosts(req.params.slug)
        res.render('poem', { post: post });
    })
    
    app.get('/about', (req,res) => {
        res.render('about');
    })
} 