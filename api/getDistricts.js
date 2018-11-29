const GLOBAL = require('../Globals');

const getDistricts = (idCity) => (
    fetch(`${GLOBAL.API_URL}/option/get-district-by-city/${idCity}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getDistricts;
