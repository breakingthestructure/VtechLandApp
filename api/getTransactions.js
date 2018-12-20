const GLOBAL = require('../Globals');

const getTransactions = (token, query) => (
    fetch(`${GLOBAL.API_URL}/transaction/history`,  //eslint-disable-line
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

module.exports = getTransactions;
