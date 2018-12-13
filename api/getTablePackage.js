const GLOBAL = require('../Globals');

const getTablePackage = (projectId, buildingId) => (
    fetch(`${GLOBAL.API_URL}/project/apartment-by-building/${buildingId}`,  //eslint-disable-line
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    .then(res => res.json())
);

module.exports = getTablePackage;
