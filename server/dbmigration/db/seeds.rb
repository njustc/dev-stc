# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(id:"0",CODE:"0",USERNAME:"admin",PASSWORD:"21232F297A57A5A743894A0E4A801FC3",NAME:"DimitriZhao");
User.create(id:"1",CODE:"1",USERNAME:"marketing",PASSWORD:"21232F297A57A5A743894A0E4A801FC3",NAME:"Marketing");
User.create(id:"2",CODE:"2",USERNAME:"customer1",PASSWORD:"21232F297A57A5A743894A0E4A801FC3",NAME:"Customer1");
User.create(id:"3",CODE:"3",USERNAME:"customer2",PASSWORD:"21232F297A57A5A743894A0E4A801FC3",NAME:"Customer2");

Function.create(id:"0-0",NAME:"ConsignAdd",FUNCTION_TYPE:"ADD",FUNCTION_OBJECT:"Consign");
Function.create(id:"0-1",NAME:"ConsignDelete",FUNCTION_TYPE:"DELETE",FUNCTION_OBJECT:"Consign");
Function.create(id:"0-2",NAME:"ConsignEdit",FUNCTION_TYPE:"EDIT",FUNCTION_OBJECT:"Consign");
Function.create(id:"0-3",NAME:"ConsignView",FUNCTION_TYPE:"VIEW",FUNCTION_OBJECT:"Consign");
Function.create(id:"1-0",NAME:"ContractAdd",FUNCTION_TYPE:"ADD",FUNCTION_OBJECT:"Contract");
Function.create(id:"1-1",NAME:"ContractDelete",FUNCTION_TYPE:"DELETE",FUNCTION_OBJECT:"Contract");
Function.create(id:"1-2",NAME:"ContractEdit",FUNCTION_TYPE:"EDIT",FUNCTION_OBJECT:"Contract");
Function.create(id:"1-3",NAME:"ContractView",FUNCTION_TYPE:"VIEW",FUNCTION_OBJECT:"Contract");


Role.create(id:"0",ROLE_NAME:"超级管理员",ROLE_STRING:"super_admin");
Role.create(id:"1",ROLE_NAME:"市场部工作人员",ROLE_STRING:"marketing_user");
Role.create(id:"2",ROLE_NAME:"普通客户",ROLE_STRING:"normal_customer");

RoleFunction.create(id:"rf0",Function_id:"0-0",Role_id:"2");
RoleFunction.create(id:"rf1",Function_id:"0-1",Role_id:"2");
RoleFunction.create(id:"rf2",Function_id:"0-2",Role_id:"2");
RoleFunction.create(id:"rf3",Function_id:"0-3",Role_id:"2");
RoleFunction.create(id:"rf4",Function_id:"1-0",Role_id:"1");
RoleFunction.create(id:"rf5",Function_id:"1-1",Role_id:"1");
RoleFunction.create(id:"rf6",Function_id:"1-2",Role_id:"1");
RoleFunction.create(id:"rf7",Function_id:"1-3",Role_id:"1");

RoleUser.create(id:"ru0",User_id:"0",Role_id:"0");
RoleUser.create(id:"ru1",User_id:"1",Role_id:"1");
RoleUser.create(id:"ru2",User_id:"2",Role_id:"2");
RoleUser.create(id:"ru3",User_id:"3",Role_id:"2");

