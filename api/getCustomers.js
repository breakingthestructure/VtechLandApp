const GLOBAL = require('../Globals');

const getCustomers = (token, query) => (
    fetch(`${GLOBAL.API_URL}/customer/search?${query}`,  //eslint-disable-line
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

module.exports = getCustomers;
