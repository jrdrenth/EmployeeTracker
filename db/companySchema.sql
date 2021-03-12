drop database if exists company;
create database company;

use company;

create table department(
  id int auto_increment not null,
  constraint pk_department primary key (id),
  name varchar(30) unique not null
);

create table role(
  id int auto_increment not null,
  constraint pk_role primary key (id),
  title varchar(30) unique not null,
  salary decimal not null,
  department_id int not null,
  index idx_role_department_id (department_id),
  constraint fk_role_department_id foreign key (department_id) references department(id) on delete cascade
);

create table employee(
  id int auto_increment not null,
  constraint pk_employee primary key (id),
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int not null,
  index idx_employee_role_id (role_id),
  constraint fk_employee_role_id foreign key (role_id) references role(id) on delete cascade,
  manager_id int,
  index idx_employee_manager_id (manager_id),
  constraint fk_employee_manager_id foreign key (manager_id) references employee(id) on delete set null
);
