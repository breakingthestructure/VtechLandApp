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
                client_id: 2,
                client_secret: '3GfSREURwlYxIAg5yPDacPG0hvE0AtamUlc82na6',
                grant_type: 'password'
            })
        })
        .then(res => res.json())
);

module.exports = login;
