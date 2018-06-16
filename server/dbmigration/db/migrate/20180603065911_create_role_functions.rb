class CreateRoleFunctions < ActiveRecord::Migration[5.2]
  def self.up
    create_join_table :Role,:Function,table_name: :tbl_sys_role_functions,
    column_options: { null: true },
    options:'ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin' do |t|
      
    end
    change_column :tbl_sys_role_functions,:Role_id,:string
    change_column :tbl_sys_role_functions,:Function_id,:string
  end
  def self.down
    drop_table :tbl_sys_role_functions
  end
end
