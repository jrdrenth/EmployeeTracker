use company;

-- ==== DEPARMENT ====
insert into department (name) 
values
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

select @salesDepartmentId := id from department where name = 'Sales';
select @engineeringDepartmentId := id from department where name = 'Engineering';
select @financeDepartmentId := id from department where name = 'Finance';
select @legalDepartmentId := id from department where name = 'Legal';


-- ==== ROLE ====
insert into role (title, salary, department_id) values ('Sales Lead', 100000, @salesDepartmentId);
select @salesLeadRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Salesperson', 80000, @salesDepartmentId);
select @salespersonRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Lead Engineer', 150000, @engineeringDepartmentId);
select @leadEngineerRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Software Engineer', 120000, @engineeringDepartmentId);
select @softwareEngineerRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Finance Lead', 155000, @financeDepartmentId);
select @financeLeadRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Accountant', 125000, @financeDepartmentId);
select @accountantRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Legal Team Lead', 250000, @legalDepartmentId);
select @legalTeamLeadRoleId := last_insert_id();
insert into role (title, salary, department_id) values ('Lawyer', 190000, @legalDepartmentId);
select @lawyerRoleId := last_insert_id();


-- ==== EMPLOYEE ====
insert into employee (first_name, last_name, role_id, manager_id) values ('Andrew', 'Murphy', @salesLeadRoleId, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Kelly', 'Gray', @salespersonRoleId, last_insert_id());
insert into employee (first_name, last_name, role_id, manager_id) values ('Karen', 'Richardson', @leadEngineerRoleId, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Jesse', 'Barnes', @softwareEngineerRoleId, last_insert_id());
insert into employee (first_name, last_name, role_id, manager_id) values ('Marilyn', 'Lopez', @financeLeadRoleId, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Patricia', 'Griffin', @accountantRoleId, last_insert_id());
insert into employee (first_name, last_name, role_id, manager_id) values ('Emily', 'Phillips', @legalTeamLeadRoleId, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Douglas', 'Allen', @lawyerRoleId, last_insert_id());
