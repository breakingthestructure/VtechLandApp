const GLOBAL = require('../Globals');

const getCities = () => (
    fetch(`${GLOBAL.API_URL}/option/get-cities`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getCities;
