const GLOBAL = require('../Globals');

const postLockApartment = (token, apartmentId) => (
    fetch(`${GLOBAL.API_URL}/transaction/lock-apartment/${apartmentId}`,  //eslint-disable-line
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
        .then(res => res.json())
);

module.exports = postLockApartment;
