const connection = require("../config/connection");

class CompanyDB {
    constructor(connection) {
    this.connection = connection;
  }

  getAllDepartments() {
    let result = this.connection.query("SELECT * from department order by id");
    return result;
  }

  dispose() {
    connection.end();
  }
}

module.exports = new CompanyDB(connection);
