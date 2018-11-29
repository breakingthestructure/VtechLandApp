const GLOBAL = require('../Globals');

const getProject = () => (
    fetch(`${GLOBAL.API_URL}/project/get-projects`,  //eslint-disable-line
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
