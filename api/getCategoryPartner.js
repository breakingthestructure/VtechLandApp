const GLOBAL = require('../Globals');

const getCategoryPartner = () => (
    fetch(`${GLOBAL.MEDIA_API_URL}/partners/get-categories`,  //eslint-disable-line
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then(res => res.json())
);

module.exports = getCategoryPartner;
