const GLOBAL = require('../Globals');

const getOptionProjects = () => (
    fetch(`${GLOBAL.API_URL}/option/get-enums`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getOptionProjects;
