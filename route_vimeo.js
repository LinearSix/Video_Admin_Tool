'use strict';

const express = require('express');
const router = express.Router();
const Vimeo = require('vimeo').Vimeo;
const client = new Vimeo("7435ccdcf6c7584fee8a852c37e7e58fb2ce54de", "RkSkrx6o42uk0eMo7IxjmJuywq1pwMNbtZ+cyIT8mFs6C9h4NNgIbOBpk8y4zuaO2iB1FXR3b3SbCpwVUplCj34gIAk6TK3Puw5xQhICL7smrg68zTF9dEE2ZmqG1kGv", "https://api.vimeo.com/oauth/access_token");

// var url = client.buildAuthorizationEndpoint(redirect_uri, scopes, state)

// Authenticate via API Key
const client = tumblr.createClient({ consumer_key: 'mkMkpLp82BUSaXbc0Afiwrc4XMMTqMoDq72O8NlAdBsn4V3RmN' });

// render tumblr page
router.get('/tumblr', (req, res, next) => {

    // Make the request
    client.blogPosts('linearsix.tumblr.com', { limit: 5, offset: 0 }, function (err, blogs) {
        
    
        let dataObj = blogs.posts;
        let selected_link = '';
        // console.log(dataObj);
        res.render('tumblr', { selected_link, dataObj });
    
    });
});

module.exports = router;