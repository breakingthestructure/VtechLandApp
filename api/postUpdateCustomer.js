const GLOBAL = require('../Globals');

const postUpdateCustomer = (token, customerId, fullname, phone, address, birthday, identity, gender, email) => (
    fetch(`${GLOBAL.API_URL}/customer/${customerId}/update`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ full_name: fullname, address, phone, birthday, identity, gender, email })
        })
        .then(res => res.json())
);

module.exports = postUpdateCustomer;
