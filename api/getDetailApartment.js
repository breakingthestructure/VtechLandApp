const GLOBAL = require('../Globals');

const getDetailApartment = (idApartment) => (
    fetch(`${GLOBAL.API_URL}/project/get-apartment/${idApartment}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getDetailApartment;
