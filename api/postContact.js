const GLOBAL = require('../Globals');

const postContact = (email, name, address, phone, date, time, note) => (
    fetch(`${GLOBAL.BASE_URL}oauth/token`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, name, address, phone, date, time, note })
        })
        .then(res => res.json())
);

module.exports = postContact;
