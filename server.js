const connection = require('./config/connection');
const asciiart = require('asciiart-logo');
require('console.table');
const companyDB = require('./db/company');


async function init() {
  console.log(asciiart({ name: 'Employee Manager', textColor: 'green' }).render());
  
  const departments = await companyDB.getAllDepartments();
  
  console.log('\n');
  console.table(departments);

  companyDB.dispose();
}

init();

