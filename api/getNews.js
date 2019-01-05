const GLOBAL = require('../Globals');

const getNews = (tag) => (
    fetch(`${GLOBAL.MEDIA_API_URL}/news/get-list?tags=${tag}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`
        },
    })
    .then(res => res.json())
);

module.exports = getNews;
