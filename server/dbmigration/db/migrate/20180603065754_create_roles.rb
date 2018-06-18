class CreateRoles < ActiveRecord::Migration[5.2]
  def self.up
    create_table :tbl_sys_roles,
    options:'ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin' do |t|
      t.string :ALTERED_TIME, null: true
      t.string :ALTERED_USER_ID, null: true
      t.string :CODE, null: true
      t.string :CREATED_TIME, null: true
      t.string :CREATED_USER_ID, null: true
      t.string :ROLE_NAME, null: true
      t.string :DESCRIPTION, null: true
      t.string :ROLE_STRING, null: true
    end
    change_column :tbl_sys_roles,:id,:string
  end
  def self.down
    drop_table :tbl_sys_roles
  end
end
