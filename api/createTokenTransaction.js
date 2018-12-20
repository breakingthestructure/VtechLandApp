const GLOBAL = require('../Globals');

const createTokenTransaction = (token, apartmentId) => (
    fetch(`${GLOBAL.API_URL}/transaction/create-token/${apartmentId}`,  //eslint-disable-line
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        .then(res => res.json())
);

module.exports = createTokenTransaction;
