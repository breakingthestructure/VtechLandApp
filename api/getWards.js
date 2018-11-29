const GLOBAL = require('../Globals');

const getWards = (idDistrict) => (
    fetch(`${GLOBAL.API_URL}/option/get-ward/${idDistrict}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getWards;
