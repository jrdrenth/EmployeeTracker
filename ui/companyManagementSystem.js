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
      case Constants.ViewAllEmployees:
        await this.viewAllEmployees();
        break;
      case Constants.ViewEmployeesByDepartment:
        await this.viewEmployeesByDepartment();
        break;
      case Constants.ViewEmployeesByManager:
        await this.viewEmployeesByManager();
        break;
      // case Constants.AddEmployee:
      //   await this.addEmployee();
      //   break;
      // case Constants.RemoveEmployee:
      //   await this.removeEmployee();
      //   break;
      // case Constants.UpdateEmployeeRole:
      //   await this.updateEmployeeRole();
      //   break;
      // case Constants.UpdateEmployeeManager:
      //   await this.updateEmployeeManager();
      //   break;
      // case Constants.ViewRoles:
      //   await this.viewRoles();
      //   break;
      case Constants.AddRole:
        await this.addRole();
        break;
      // case Constants.RemoveRole:
      //   await this.removeRole();
      //   break;
      // case Constants.ViewDepartments:
      //   await this.viewDepartments();
      //   break;
      // case Constants.AddDepartment:
      //   await this.addDepartment();
      //   break;
      // case Constants.RemoveDepartment:
      //   await this.removeDepartment();
      //   break;
      case Constants.Quit:
        this.quit();
        break;
      default:
        this.quit();
      }
  }

  
  async viewAllEmployees() {
    const employees = await this.companyRepository.getAllEmployees();

    console.log('\n');
    console.table(employees);
  }

  async viewEmployeesByDepartment() {
    const departments = await this.companyRepository.getAllDepartments();

    // Map the manager objects into objects containing "name" & "value" properties.
    // Inquirer will display the "name" property from the items and return the "value" property from the selected item
    const departmentNameValuePairs = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    const { departmentId } = await prompt(PromptArgs.GetViewEmployeeByDepartmentArgs('departmentId', departmentNameValuePairs));
    const employees = await this.companyRepository.getEmployeesByDepartment(departmentId);
  
    console.log('\n');
    console.table(employees);
    
  }

  async viewEmployeesByManager() {
    const managers = await this.companyRepository.getAllManagers();

    // Map the manager objects into objects containing "name" & "value" properties.
    // Inquirer will display the "name" property from the items and return the "value" property from the selected item
    const managerNameValuePairs = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    const { managerId } = await prompt(PromptArgs.GetViewEmployeeByManagerArgs('managerId', managerNameValuePairs));
    const employees = await this.companyRepository.getEmployeesByManager(managerId);
  
    console.log('\n');
    console.table(employees);

  }
  
  
  async addRole() {
    // Get all departments
    const allDepartments = await this.companyRepository.getAllDepartments();
    
    // Map the department objects into objects containing "name" & "value" properties.
    // Inquirer will display the "name" property from the items and return the "value" property from the selected item
    const departments = allDepartments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    // Get user prompt questions/args
    const newRoleArgs = PromptArgs.GetNewRoleArgs(departments);
  
    // Generate new role from user input
    const newRole = await prompt(newRoleArgs);
  
    // Create the new role
    await this.companyRepository.createRole(newRole);

    console.log(`\nRole added: ${newRole.title}\n`);
  }

  
  quit() {
    this.isUserCompleted = true;
  }

  
  async main() {
    // Display app logo
    console.log(asciiart({ name: 'Employee Manager', textColor: 'green' }).render());
    
    while (!this.isUserCompleted) {
      await this.displayMainMenu();
    }

    console.log('\nGoodbye!\n');
    this.companyRepository.dispose();
  }

}

module.exports = CompanyManagementSystem;
