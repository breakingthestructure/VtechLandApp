const GLOBAL = require('../Globals');

const postRegister = (email, password, passwordConfirmation) => (
    fetch(`${GLOBAL.API_URL}/user/register`,  //eslint-disable-line
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                password_confirmation: passwordConfirmation
            })
        })
        .then(res => res.json())
);

module.exports = postRegister;
