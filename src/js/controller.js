const utils = require('./utils');

module.exports = function(app) {

    app.get('/', function(req, res) {
        const posts = utils.prepPosts()
        res.render('index', { posts: posts });
    })

    app.get('/poem/:slug', function(req, res) {
        const post = utils.prepPosts(req.params.slug)
        res.render('poem', { post: post });
    })

    app.get('/about', function(req,res){
        res.render('about');
    })
} 