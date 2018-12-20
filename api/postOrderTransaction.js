const GLOBAL = require('../Globals');

const postOrderTransaction = (
    token,
    transactionCode,
    searchCustomer,
    customerId,
    fullName,
    email,
    address,
    phone,
    identity,
    paymentMethod,
    reserveValue
) => (
    fetch(`${GLOBAL.API_URL}/transaction/create-transaction/${transactionCode}`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                search_customer: searchCustomer,
                customer_id: customerId,
                full_name: fullName,
                email,
                address,
                phone,
                identity,
                payment_method: paymentMethod,
                reserve_value: reserveValue,
            })
        })
        .then(res => res.json())
);

module.exports = postOrderTransaction;
