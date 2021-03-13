const Constants = require('./constants');

// Questions/arguments to be passed into prompts
class PromptArgs {

  static GetMainMenuArgs(name) {
    return [
      {
        name: name,
        type: "list",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: Constants.ViewAllEmployees
          }, {
            name: "View All Employees By Department",
            value: Constants.ViewEmployeesByDepartment
          }, {
            name: "View All Employees By Manager",
            value: Constants.ViewEmployeesByManager
          }, {
            name: "Add Employee",
            value: Constants.AddEmployee
          }, {
            name: "Remove Employee",
            value: Constants.RemoveEmployee
          }, {
            name: "Update Employee Role",
            value: Constants.UpdateEmployeeRole
          }, {
            name: "Update Employee Manager",
            value: Constants.UpdateEmployeeManager
          }, {
            name: "View All Roles",
            value: Constants.ViewRoles
          }, {
            name: "Add Role",
            value: Constants.AddRole
          }, {
            name: "Remove Role",
            value: Constants.RemoveRole
          }, {
            name: "View All Departments",
            value: Constants.ViewDepartments
          }, {
            name: "Add Department",
            value: Constants.AddDepartment
          }, {
            name: "Remove Department",
            value: Constants.removeDepartment
          }, {
            name: "Quit",
            value: Constants.Quit
          }
        ]
      }
    ];
  }

  static GetNewEmployeeNameArgs(firstName, lastName) {
    return [
      {
        name: firstName,
        message: "What is the employee's first name?"
      }, {
        name: lastName,
        message: "What is the employee's last name?"
      }
    ];
  }

  static GetNewEmployeeRoleArgs(name, roleNameValuePairs) {
    return [
      {
        name: name,
        type: "list",
        message: "What is the employee's role?",
        choices: roleNameValuePairs
      }
    ];
  }

  static GetNewEmployeeManagerArgs(name, managerNameValuePairs) {
    return [
      {
        name: name,
        type: "list",
        message: "Who is the employee's manager?",
        choices: managerNameValuePairs
      }
    ];
  }

  static GetViewEmployeeByDepartmentArgs(name, departmentNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which department would you like to see employees for?',
        choices: departmentNameValuePairs
      }
    ];
  }

  static GetViewEmployeeByManagerArgs(name, managerNameValuePairs) {
    return [
      {
        name: name,
        type: "list",
        message: "Which manager do you want to see direct reports for?",
        choices: managerNameValuePairs
      }
    ];
  }

  static GetUpdateEmployeeRoleArgs() {
    return [];
  }

  static GetAssignEmployeeRoleArgs() {
    return [];
  }

  static GetUpdateEmployeeManagerArgs() {
    return [];
  }
  
  static GetAssignEmployeeManagerArgs() {
    return [];
  }

  static GetRemoveEmployeeArgs() {
    return [];
  }

  static GetNewRoleArgs (roleName, salaryName, departmentName, departments) {
    return [
      {
        name: roleName,
        message: "What is the name of the role?"
      }, {
        name: salaryName,
        message: "What is the salary of the role?"
      }, {
        name: departmentName,
        type: "list",
        message: "Which department does the role belong to?",
        choices: departments
      }
    ];
  }

  static GetRemoveRoleArgs(roles) {
    return [
      {
        name: "role",
        type: "list",
        message: "Which role do you want to remove? (Warning: This will also remove employees associated with the role)",
        choices: roles
      }
    ];
  }

  static GetNewDepartmentArgs() {
    return [];
  }

  static GetRemoveDepartmentArgs() {
    return [];
  }

}

module.exports = PromptArgs;
