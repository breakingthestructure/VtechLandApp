const GLOBAL = require('../Globals');

const getListPartner = (idPartner) => (
    fetch(`${GLOBAL.MEDIA_API_URL}/partners/get-list?category_id=${idPartner}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getListPartner;
