const GLOBAL = require('../Globals');
const axios = require('axios');

const getProject = (query = '') => (
    fetch(`${GLOBAL.API_URL}/project/get-projects?${query}`,  //eslint-disable-line
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getProject;
