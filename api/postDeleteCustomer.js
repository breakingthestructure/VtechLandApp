const GLOBAL = require('../Globals');

const postDeleteCustomer = (token, customerId) => (
    fetch(`${GLOBAL.API_URL}/customer/${customerId}/delete`,  //eslint-disable-line
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

module.exports = postDeleteCustomer;
