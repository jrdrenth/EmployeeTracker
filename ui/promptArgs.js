const Constants = require('./constants');

// Questions/arguments to be passed into prompts
class PromptArgs {

  static GetMainMenuArgs(name) {
    return [
      {
        name: name,
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          {
            name: 'View All Employees',
            value: Constants.ViewAllEmployees
          }, {
            name: 'View All Employees By Department',
            value: Constants.ViewEmployeesByDepartment
          }, {
            name: 'View All Employees By Manager',
            value: Constants.ViewEmployeesByManager
          }, {
            name: 'Add Employee',
            value: Constants.AddEmployee
          }, {
            name: 'Remove Employee',
            value: Constants.RemoveEmployee
          }, {
            name: 'Update Employee Role',
            value: Constants.UpdateEmployeeRole
          }, {
            name: 'Update Employee Manager',
            value: Constants.UpdateEmployeeManager
          }, {
            name: 'View All Roles',
            value: Constants.ViewRoles
          }, {
            name: 'Add Role',
            value: Constants.AddRole
          }, {
            name: 'Remove Role',
            value: Constants.RemoveRole
          }, {
            name: 'View All Departments',
            value: Constants.ViewDepartments
          }, {
            name: 'Add Department',
            value: Constants.AddDepartment
          }, {
            name: 'Remove Department',
            value: Constants.RemoveDepartment
          }, {
            name: 'Quit',
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
        type: 'input',
        message: 'What is the employee\'s first name?'
      }, {
        name: lastName,
        type: 'input',
        message: 'What is the employee\'s last name?'
      }
    ];
  }

  static GetNewEmployeeRoleArgs(name, roleNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'What is the employee\'s role?',
        choices: roleNameValuePairs
      }
    ];
  }

  static GetNewEmployeeManagerArgs(name, managerNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Who is the employee\'s manager?',
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
        type: 'list',
        message: 'Which manager do you want to see direct reports for?',
        choices: managerNameValuePairs
      }
    ];
  }

  static GetUpdateEmployeeRoleArgs(name, employeeNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which employee\'s role do you want to update?',
        choices: employeeNameValuePairs
      }
    ];
  }

  static GetAssignEmployeeRoleArgs(name, roleNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which role do you want to assign the selected employee?',
        choices: roleNameValuePairs
      }
    ];
  }

  static GetUpdateEmployeeManagerArgs(name, employeeNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which employee would you like assigned to a different manager?',
        choices: employeeNameValuePairs
      }
    ];
  }
  
  static GetAssignEmployeeManagerArgs(name, managerNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Who do you want to set as manager for the selected employee?',
        choices: managerNameValuePairs
      }
    ];
  }

  static GetRemoveEmployeeArgs(name, employeeNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which employee do you want to remove?',
        choices: employeeNameValuePairs
      }
    ];
  }

  static GetNewRoleArgs (roleName, salaryName, departmentName, departmentNameValuePairs) {
    return [
      {
        name: roleName,
        type: 'input',
        message: 'What is the name of the role?'
      }, {
        name: salaryName,
        type: 'input',
        message: 'What is the salary of the role?'
      }, {
        name: departmentName,
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: departmentNameValuePairs
      }
    ];
  }

  static GetRemoveRoleArgs(name, roleNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which role do you want to remove? (Warning: This will also remove employees associated with the role)',
        choices: roleNameValuePairs
      }
    ];
  }

  static GetNewDepartmentArgs(name) {
    return [
      {
        name: name,
        type: 'input',
        message: 'What is the name of the department?'
      }
    ];
  }

  static GetRemoveDepartmentArgs(name, departmentNameValuePairs) {
    return [
      {
        name: name,
        type: 'list',
        message: 'Which department would you like to remove? (Warning: This will also remove associated roles and employees)',
        choices: departmentNameValuePairs
      }
    ];
  }

}


module.exports = PromptArgs;
