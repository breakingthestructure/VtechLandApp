const GLOBAL = require('../Globals');

const getTablePackage = (projectId, buildingId) => (
    fetch(`${GLOBAL.API_URL}/project/get-table?project_id=${projectId}&building_id=${buildingId}`,  //eslint-disable-line
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
