const GLOBAL = require('../Globals');

const getStreets = (idDistrict) => (
    fetch(`${GLOBAL.API_URL}/option/get-street/${idDistrict}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getStreets;