const connection = require('../config/connection');

class CompanyRepository {

  constructor() {
    this.connection = connection;
  }

  createEmployee(newEmployee) {
    const commandText = 'insert into employee set ?';
    const result = this.connection.query(commandText, newEmployee);
    return result;
  }

  getAllEmployees() {
    const queryText = 
      `select empl.id,
        empl.first_name,
        empl.last_name,
        role.title,
        dept.name as department,
        role.salary,
        concat(mngr.first_name, ' ', mngr.last_name) as manager
      from employee empl
      inner join role role on empl.role_id = role.id
      inner join department dept on role.department_id = dept.id
      left join employee mngr on empl.manager_id = mngr.id
      order by empl.id`;

    const resultSet = this.connection.query(queryText);
    return resultSet;
  }

  // Get all employees other than the one passed in
  getAllOtherEmployees(excludeEmployeeId) {
    const queryText = 
      `select empl.id,
        empl.first_name,
        empl.last_name,
        role.title,
        dept.name as department
      from employee empl
      inner join role role on empl.role_id = role.id
      inner join department dept on role.department_id = dept.id
      where empl.id <> ?
      order by empl.id`;

    const resultSet = this.connection.query(queryText, excludeEmployeeId);
    return resultSet;
  }

  getEmployeesByDepartment(departmentId) {
    const queryText = 
      `select empl.id,
        empl.first_name,
        empl.last_name,
        role.title,
        role.salary,
        concat(mngr.first_name, ' ', mngr.last_name) as manager
      from employee empl
      inner join role role on empl.role_id = role.id
      left join employee mngr on empl.manager_id = mngr.id
      where role.department_id = ?
      order by empl.id`;

    const resultSet = this.connection.query(queryText, departmentId);
    return resultSet;
  }

  getEmployeesByManager(managerId) {
    const queryText = 
      `select empl.id,
        empl.first_name,
        empl.last_name,
        role.title,
        dept.name as department,
        role.salary
      from employee empl
      inner join role role on empl.role_id = role.id
      inner join department dept on role.department_id = dept.id
      where empl.manager_id = ?
      order by empl.id`;

    const resultSet = this.connection.query(queryText, managerId);
    return resultSet;
  }

  getAllManagers() {
    const queryText = 
      `select distinct mngr.id,
        mngr.first_name,
        mngr.last_name,
        role.title,
        dept.name as department
      from employee mngr
      inner join role role on mngr.role_id = role.id
      inner join department dept on role.department_id = dept.id
      inner join employee empl on mngr.id = empl.manager_id
      order by mngr.id`;

    const resultSet = this.connection.query(queryText);
    return resultSet;
  }

  updateEmployeeRole(employeeId, roleId) {
    const commandText = 'update employee set role_id = ? where id = ?';
    const result = this.connection.query(commandText, [roleId, employeeId]);
    return result;
  }

  updateEmployeeManager(employeeId, managerId) {
    const commandText = 'update employee set manager_id = ? where id = ?';
    const result = this.connection.query(commandText, [managerId, employeeId]);
    return result;
  }  

  deleteEmployee(employeeId) {
    const commandText = 'delete from employee where id = ?';
    const result = this.connection.query(commandText, employeeId);
    return result;
  }

  createRole(newRole) {
    const commandText = 'insert into role set ?';
    const result = this.connection.query(commandText, newRole);
    return result;
  }

  getAllRoles() {
    const queryText = 
      `select role.id,
        role.title,
        dept.name as department,
        role.salary
      from role role
      inner join department dept on role.department_id = dept.id
      order by role.id`;

    const resultSet = this.connection.query(queryText);
    return resultSet;
  }

  deleteRole(roleId) {
    const commandText = 'delete from role where id = ?';
    const result = this.connection.query(commandText, roleId);
    return result;
  }  

  createDepartment(newDepartment) {
    const commandText = 'insert into department set ?';
    const result = this.connection.query(commandText, newDepartment);
    return result;
  }

  getAllDepartments() {
    const queryText = 
      `select dept.*, sum(role.salary) as utilized_budget
      from department dept
      left join role role on dept.id = role.department_id
      left join employee empl on role.id = empl.role_id
      group by dept.id
      order by dept.id`;

    const resultSet = this.connection.query(queryText);
    return resultSet;
  }

  deleteDepartment(departmentId) {
    const commandText = 'delete from department where id = ?';
    const result = this.connection.query(commandText, departmentId);
    return result;
  }  

  // Can be called when done with the DB to close the connection
  dispose() {
    connection.end();
  }
}

module.exports = CompanyRepository;
