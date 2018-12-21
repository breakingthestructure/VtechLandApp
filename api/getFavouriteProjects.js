const GLOBAL = require('../Globals');

const getFavouriteProjects = (token) => (
    fetch(`${GLOBAL.API_URL}/project/get-favourite-list`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(res => res.json())
);

module.exports = getFavouriteProjects;
