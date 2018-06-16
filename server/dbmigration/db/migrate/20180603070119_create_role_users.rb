class CreateRoleUsers < ActiveRecord::Migration[5.2]
  def self.up
    create_join_table :Role,:User,table_name: :tbl_sys_role_users,
    column_options: { null: false },
    options:'ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin' do |t|
      
    end
    change_column :tbl_sys_role_users,:Role_id,:string
    change_column :tbl_sys_role_users,:User_id,:string
  end
  def self.down
    drop_table :tbl_sys_role_users
  end
end
