class AddForeignKey < ActiveRecord::Migration[5.2]
  def self.up
    add_foreign_key :tbl_sys_projects, :tbl_sys_consigns, column: :CONSIGN_ID
    add_foreign_key :tbl_sys_projects, :tbl_sys_contracts, column: :CONTRACT_ID
    add_foreign_key :tbl_sys_role_users, :tbl_sys_roles, column: :Role_id
    add_foreign_key :tbl_sys_role_users, :tbl_sys_users, column: :User_id
    add_foreign_key :tbl_sys_role_functions, :tbl_sys_roles, column: :Role_id
    add_foreign_key :tbl_sys_role_functions, :tbl_sys_functions, column: :Function_id
    add_foreign_key :tbl_sys_consigns, :tbl_sys_users, column: :USER_ID
    add_foreign_key :tbl_sys_contracts, :tbl_sys_users, column: :USER_ID
    add_foreign_key :tbl_sys_projects, :tbl_sys_users, column: :USER_ID
    add_foreign_key :tbl_sys_projects, :tbl_sys_testreports, column: :TESTREPORT_ID
    add_foreign_key :tbl_sys_testplans, :tbl_sys_projects, column: :PROJECT_ID
    add_foreign_key :tbl_sys_testresults, :tbl_sys_projects,column: :PROJECT_ID

  end

  def self.down
    remove_foreign_key :tbl_sys_testresults, column: :PROJECT_ID
    remove_foreign_key :tbl_sys_testplans, column: :PROJECT_ID
    remove_foreign_key :tbl_sys_projects, column: :TESTREPORT_ID
    remove_foreign_key :tbl_sys_projects, column: :USER_ID
    remove_foreign_key :tbl_sys_contracts, column: :USER_ID
    remove_foreign_key :tbl_sys_consigns, column: :USER_ID
    remove_foreign_key :tbl_sys_role_functions, column: :Function_id
    remove_foreign_key :tbl_sys_role_functions, column: :Role_id
    remove_foreign_key :tbl_sys_role_users, column: :User_id
    remove_foreign_key :tbl_sys_role_users, column: :Role_id
    remove_foreign_key :tbl_sys_projects, column: :CONTRACT_ID
    remove_foreign_key :tbl_sys_projects, column: :CONSIGN_ID
  end
end
