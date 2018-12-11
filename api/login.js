const GLOBAL = require('../Globals');

const login = (email, password) => (
    fetch(`${GLOBAL.BASE_URL}oauth/token`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password,
                client_id: GLOBAL.CLIENT_ID,
                client_secret: GLOBAL.CLIENT_SECRET,
                grant_type: 'password'
            })
        })
        .then(res => res.json())
);

module.exports = login;
