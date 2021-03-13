const { prompt } = require('inquirer');
const asciiart = require('asciiart-logo');
require('console.table');
const CompanyRepository = require('../db/companyRepository');
const Constants = require('./constants');
const PromptArgs = require('./promptArgs');


class CompanyManagementSystem {
  
  constructor() {
    this.companyRepository = new CompanyRepository();
    this.isUserCompleted = false;

    this.main();
  }

  
  async displayMainMenu() {
    const mainMenuArgs = PromptArgs.GetMainMenuArgs('task');
    console.log(); // this displays a blank newline
    const { task } = await prompt(mainMenuArgs);
  
    await this.performTask(task);
  }
  
  
  async performTask(task) {
  
    switch (task) {
      case Constants.AddEmployee:
        await this.addEmployee();
        break;
      case Constants.ViewAllEmployees:
        await this.viewAllEmployees();
        break;
      case Constants.ViewEmployeesByDepartment:
        await this.viewEmployeesByDepartment();
        break;
      case Constants.ViewEmployeesByManager:
        await this.viewEmployeesByManager();
        break;
      case Constants.UpdateEmployeeRole:
        await this.updateEmployeeRole();
        break;
      case Constants.UpdateEmployeeManager:
        await this.updateEmployeeManager();
        break;
      case Constants.RemoveEmployee:
        await this.removeEmployee();
        break;
      case Constants.AddRole:
        await this.addRole();
        break;
      case Constants.ViewRoles:
        await this.viewRoles();
        break;
      case Constants.RemoveRole:
        await this.removeRole();
        break;
      case Constants.AddDepartment:
        await this.addDepartment();
        break;
      case Constants.ViewDepartments:
        await this.viewDepartments();
        break;
      case Constants.RemoveDepartment:
        await this.removeDepartment();
        break;
      case Constants.Quit:
        this.quit();
        break;
      default:
        this.quit();
      }
  }

  
  async addEmployee() {
    // Get potential managers
    const potentialManagers = await this.companyRepository.getAllEmployees();

    // Map the employee objects into objects containing "name" & "value" properties.
    // Inquirer will display the "name" property from the items and return the "value" property from the user selected item
    var potentialManagerNameValuePairs = potentialManagers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    
    // Add option for new employee to not have a manager
    potentialManagerNameValuePairs = [...potentialManagerNameValuePairs, { name: 'None', value: null }];

    // Get all roles
    const roles = await this.companyRepository.getAllRoles();
    const roleNameValuePairs = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));


    // User provides new employee's name and chooses the role and manager
    const newEmployee = await prompt(PromptArgs.GetNewEmployeeNameArgs('first_name', 'last_name'));
    const { roleId } = await prompt(PromptArgs.GetNewEmployeeRoleArgs('roleId', roleNameValuePairs));
    const { managerId } = await prompt(PromptArgs.GetNewEmployeeManagerArgs('managerId', potentialManagerNameValuePairs));

    newEmployee.role_id = roleId;
    newEmployee.manager_id = managerId;

    // Insert new employee
    await this.companyRepository.createEmployee(newEmployee);
    console.log(`\nEmployee added: ${newEmployee.first_name} ${newEmployee.last_name}\n`);

  }


  async viewAllEmployees() {
    // Get all employees
    const employees = await this.companyRepository.getAllEmployees();

    // Display employees
    console.log('\n');
    console.table(employees);
  }

  async viewEmployeesByDepartment() {
    // Get all departments
    const departments = await this.companyRepository.getAllDepartments();
    const departmentNameValuePairs = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    // User chooses department to filter employees with
    const { departmentId } = await prompt(PromptArgs.GetViewEmployeeByDepartmentArgs('departmentId', departmentNameValuePairs));
    
    // Get list of employees filtered by department
    const employees = await this.companyRepository.getEmployeesByDepartment(departmentId);
  
    // Display employees
    console.log('\n');
    console.table(employees);
    
  }


  async viewEmployeesByManager() {
    // Get all current managers
    const managers = await this.companyRepository.getAllManagers();
    const managerNameValuePairs = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    // User chooses manager to filter employees with
    const { managerId } = await prompt(PromptArgs.GetViewEmployeeByManagerArgs('managerId', managerNameValuePairs));
    
    // Get list of employees filtered by manager
    const employees = await this.companyRepository.getEmployeesByManager(managerId);
  
    // Display employees
    console.log('\n');
    console.table(employees);

  }


  async updateEmployeeRole() {
    // Get current employees
    const currentEmployees = await this.companyRepository.getAllEmployees();
    var employeeNameValuePairs = currentEmployees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    // User chooses which employee to update
    const { employeeId } = await prompt(PromptArgs.GetUpdateEmployeeRoleArgs('employeeId', employeeNameValuePairs));
    
    // Get potential new roles
    const roles = await this.companyRepository.getAllOtherRoles(employeeId);
    const roleNameValuePairs = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    // User chooses new role
    const { roleId } = await prompt(PromptArgs.GetNewEmployeeRoleArgs('roleId', roleNameValuePairs));

    // Set new role on employee
    await this.companyRepository.updateEmployeeRole(employeeId, roleId);
    console.log('Employee\'s role changed');

  }


  async updateEmployeeManager() {
    // Get current employees
    const currentEmployees = await this.companyRepository.getAllEmployees();
    const employeeNameValuePairs = currentEmployees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    // User chooses which employee to update
    const { employeeId } = await prompt(PromptArgs.GetUpdateEmployeeManagerArgs('employeeId', employeeNameValuePairs));

    // Get list of potential managers
    const possibleManagers = await this.companyRepository.getAllOtherEmployees(employeeId);
    var posibleManagerNameValuePairs = possibleManagers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    posibleManagerNameValuePairs = [...posibleManagerNameValuePairs, { name: 'None', value: null }];

    // User chooses new manager
    const { managerId } = await prompt(PromptArgs.GetAssignEmployeeManagerArgs('managerId', posibleManagerNameValuePairs));
    
    // Assign new manager to employee
    await this.companyRepository.updateEmployeeManager(employeeId, managerId);
    console.log('Employee\'s manager changed');

  }


  async removeEmployee() {
    // Get employees
    const employees = await this.companyRepository.getAllEmployees();
    const employeeNameValuePairs = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    // User chooses employee to delete
    const { employeeId } = await prompt(PromptArgs.GetRemoveEmployeeArgs('employeeId', employeeNameValuePairs));

    // Delete employee
    await this.companyRepository.deleteEmployee(employeeId);
    console.log(`\nEmployee removed\n`);

  }


  async addRole() {
    // Get all departments
    const departments = await this.companyRepository.getAllDepartments();
    
    // Map the department objects into objects containing "name" & "value" properties.
    // Inquirer will display the "name" property from the items and return the "value" property from the selected item
    const departmentNameValuePairs = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    // Get user prompt questions/args
    const newRoleArgs = PromptArgs.GetNewRoleArgs('title', 'salary', 'department_id',  departmentNameValuePairs);
  
    // Generate new role from user input
    const newRole = await prompt(newRoleArgs);
  
    // Create the new role
    await this.companyRepository.createRole(newRole);
    console.log(`\nRole added: ${newRole.title}\n`);
  }


  async viewRoles() {
    // Get all roles
    const roles = await this.companyRepository.getAllRoles();

    // Display roles
    console.log('\n');
    console.table(roles);
  }


  async removeRole() {
    // Get all roles
    const roles = await this.companyRepository.getAllRoles();
    const roleNameValuePairs = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    // User chooses which role to delete
    const { roleId } = await prompt(PromptArgs.GetRemoveRoleArgs('roleId', roleNameValuePairs));

    // Delete role
    await this.companyRepository.deleteRole(roleId);
    console.log(`\nRole removed\n`);

  }


  async addDepartment() {
    // Get user prompt questions/args
    const newDepartmentArgs = PromptArgs.GetNewDepartmentArgs('name');
  
    // Generate new department from user input
    const newDepartment = await prompt(newDepartmentArgs);
  
    // Insert new department
    await this.companyRepository.createDepartment(newDepartment);
    console.log(`\nDepartment added: ${newDepartment.name}\n`);
  }


  async viewDepartments() {
    // Get departments
    const departments = await this.companyRepository.getAllDepartments();

    // Display departments
    console.log('\n');
    console.table(departments);
  }


  async removeDepartment() {
    // Get departments
    const departments = await this.companyRepository.getAllDepartments();
    const departmentNameValuePairs = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    // User chooses which department to remove
    const { departmentId } = await prompt(PromptArgs.GetRemoveDepartmentArgs('departmentId', departmentNameValuePairs));

    // Delete department
    await this.companyRepository.deleteDepartment(departmentId);
    console.log(`\nDepartment removed\n`);

  }

  
  quit() {
    this.isUserCompleted = true;
  }

  
  async main() {
    // Display app logo
    console.log(asciiart({ name: 'Employee Manager', textColor: 'green' }).render());
    
    // Keep displaying menu to user until the quit option is selected
    while (!this.isUserCompleted) {
      await this.displayMainMenu();
    }

    console.log('\nGoodbye!\n');
    this.companyRepository.dispose();
  }

}

module.exports = CompanyManagementSystem;
