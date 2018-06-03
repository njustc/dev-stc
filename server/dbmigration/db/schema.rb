# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_03_072436) do

  create_table "act_evt_log", primary_key: "LOG_NR_", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "TYPE_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "EXECUTION_ID_", limit: 64
    t.string "TASK_ID_", limit: 64
    t.timestamp "TIME_STAMP_", precision: 3, null: false
    t.string "USER_ID_"
    t.binary "DATA_", limit: 4294967295
    t.string "LOCK_OWNER_"
    t.timestamp "LOCK_TIME_", precision: 3
    t.integer "IS_PROCESSED_", limit: 1, default: 0
  end

  create_table "act_ge_bytearray", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "NAME_"
    t.string "DEPLOYMENT_ID_", limit: 64
    t.binary "BYTES_", limit: 4294967295
    t.integer "GENERATED_", limit: 1
    t.index ["DEPLOYMENT_ID_"], name: "ACT_FK_BYTEARR_DEPL"
  end

  create_table "act_ge_property", primary_key: "NAME_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "VALUE_", limit: 300
    t.integer "REV_"
  end

  create_table "act_hi_actinst", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "PROC_DEF_ID_", limit: 64, null: false
    t.string "PROC_INST_ID_", limit: 64, null: false
    t.string "EXECUTION_ID_", limit: 64, null: false
    t.string "ACT_ID_", null: false
    t.string "TASK_ID_", limit: 64
    t.string "CALL_PROC_INST_ID_", limit: 64
    t.string "ACT_NAME_"
    t.string "ACT_TYPE_", null: false
    t.string "ASSIGNEE_"
    t.datetime "START_TIME_", precision: 3, null: false
    t.datetime "END_TIME_", precision: 3
    t.bigint "DURATION_"
    t.string "DELETE_REASON_", limit: 4000
    t.string "TENANT_ID_", default: ""
    t.index ["END_TIME_"], name: "ACT_IDX_HI_ACT_INST_END"
    t.index ["EXECUTION_ID_", "ACT_ID_"], name: "ACT_IDX_HI_ACT_INST_EXEC"
    t.index ["PROC_INST_ID_", "ACT_ID_"], name: "ACT_IDX_HI_ACT_INST_PROCINST"
    t.index ["START_TIME_"], name: "ACT_IDX_HI_ACT_INST_START"
  end

  create_table "act_hi_attachment", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "USER_ID_"
    t.string "NAME_"
    t.string "DESCRIPTION_", limit: 4000
    t.string "TYPE_"
    t.string "TASK_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "URL_", limit: 4000
    t.string "CONTENT_ID_", limit: 64
    t.datetime "TIME_", precision: 3
  end

  create_table "act_hi_comment", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "TYPE_"
    t.datetime "TIME_", precision: 3, null: false
    t.string "USER_ID_"
    t.string "TASK_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "ACTION_"
    t.string "MESSAGE_", limit: 4000
    t.binary "FULL_MSG_", limit: 4294967295
  end

  create_table "act_hi_detail", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "TYPE_", null: false
    t.string "PROC_INST_ID_", limit: 64
    t.string "EXECUTION_ID_", limit: 64
    t.string "TASK_ID_", limit: 64
    t.string "ACT_INST_ID_", limit: 64
    t.string "NAME_", null: false
    t.string "VAR_TYPE_"
    t.integer "REV_"
    t.datetime "TIME_", precision: 3, null: false
    t.string "BYTEARRAY_ID_", limit: 64
    t.float "DOUBLE_", limit: 53
    t.bigint "LONG_"
    t.string "TEXT_", limit: 4000
    t.string "TEXT2_", limit: 4000
    t.index ["ACT_INST_ID_"], name: "ACT_IDX_HI_DETAIL_ACT_INST"
    t.index ["NAME_"], name: "ACT_IDX_HI_DETAIL_NAME"
    t.index ["PROC_INST_ID_"], name: "ACT_IDX_HI_DETAIL_PROC_INST"
    t.index ["TASK_ID_"], name: "ACT_IDX_HI_DETAIL_TASK_ID"
    t.index ["TIME_"], name: "ACT_IDX_HI_DETAIL_TIME"
  end

  create_table "act_hi_identitylink", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "GROUP_ID_"
    t.string "TYPE_"
    t.string "USER_ID_"
    t.string "TASK_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.index ["PROC_INST_ID_"], name: "ACT_IDX_HI_IDENT_LNK_PROCINST"
    t.index ["TASK_ID_"], name: "ACT_IDX_HI_IDENT_LNK_TASK"
    t.index ["USER_ID_"], name: "ACT_IDX_HI_IDENT_LNK_USER"
  end

  create_table "act_hi_procinst", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "PROC_INST_ID_", limit: 64, null: false
    t.string "BUSINESS_KEY_"
    t.string "PROC_DEF_ID_", limit: 64, null: false
    t.datetime "START_TIME_", precision: 3, null: false
    t.datetime "END_TIME_", precision: 3
    t.bigint "DURATION_"
    t.string "START_USER_ID_"
    t.string "START_ACT_ID_"
    t.string "END_ACT_ID_"
    t.string "SUPER_PROCESS_INSTANCE_ID_", limit: 64
    t.string "DELETE_REASON_", limit: 4000
    t.string "TENANT_ID_", default: ""
    t.string "NAME_"
    t.index ["BUSINESS_KEY_"], name: "ACT_IDX_HI_PRO_I_BUSKEY"
    t.index ["END_TIME_"], name: "ACT_IDX_HI_PRO_INST_END"
    t.index ["PROC_INST_ID_"], name: "PROC_INST_ID_", unique: true
  end

  create_table "act_hi_taskinst", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "PROC_DEF_ID_", limit: 64
    t.string "TASK_DEF_KEY_"
    t.string "PROC_INST_ID_", limit: 64
    t.string "EXECUTION_ID_", limit: 64
    t.string "NAME_"
    t.string "PARENT_TASK_ID_", limit: 64
    t.string "DESCRIPTION_", limit: 4000
    t.string "OWNER_"
    t.string "ASSIGNEE_"
    t.datetime "START_TIME_", precision: 3, null: false
    t.datetime "CLAIM_TIME_", precision: 3
    t.datetime "END_TIME_", precision: 3
    t.bigint "DURATION_"
    t.string "DELETE_REASON_", limit: 4000
    t.integer "PRIORITY_"
    t.datetime "DUE_DATE_", precision: 3
    t.string "FORM_KEY_"
    t.string "CATEGORY_"
    t.string "TENANT_ID_", default: ""
    t.index ["PROC_INST_ID_"], name: "ACT_IDX_HI_TASK_INST_PROCINST"
  end

  create_table "act_hi_varinst", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "PROC_INST_ID_", limit: 64
    t.string "EXECUTION_ID_", limit: 64
    t.string "TASK_ID_", limit: 64
    t.string "NAME_", null: false
    t.string "VAR_TYPE_", limit: 100
    t.integer "REV_"
    t.string "BYTEARRAY_ID_", limit: 64
    t.float "DOUBLE_", limit: 53
    t.bigint "LONG_"
    t.string "TEXT_", limit: 4000
    t.string "TEXT2_", limit: 4000
    t.datetime "CREATE_TIME_", precision: 3
    t.datetime "LAST_UPDATED_TIME_", precision: 3
    t.index ["NAME_", "VAR_TYPE_"], name: "ACT_IDX_HI_PROCVAR_NAME_TYPE"
    t.index ["PROC_INST_ID_"], name: "ACT_IDX_HI_PROCVAR_PROC_INST"
    t.index ["TASK_ID_"], name: "ACT_IDX_HI_PROCVAR_TASK_ID"
  end

  create_table "act_id_group", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "NAME_"
    t.string "TYPE_"
  end

  create_table "act_id_info", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "USER_ID_", limit: 64
    t.string "TYPE_", limit: 64
    t.string "KEY_"
    t.string "VALUE_"
    t.binary "PASSWORD_", limit: 4294967295
    t.string "PARENT_ID_"
  end

  create_table "act_id_membership", primary_key: ["USER_ID_", "GROUP_ID_"], options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "USER_ID_", limit: 64, null: false
    t.string "GROUP_ID_", limit: 64, null: false
    t.index ["GROUP_ID_"], name: "ACT_FK_MEMB_GROUP"
  end

  create_table "act_id_user", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "FIRST_"
    t.string "LAST_"
    t.string "EMAIL_"
    t.string "PWD_"
    t.string "PICTURE_ID_", limit: 64
  end

  create_table "act_procdef_info", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "PROC_DEF_ID_", limit: 64, null: false
    t.integer "REV_"
    t.string "INFO_JSON_ID_", limit: 64
    t.index ["INFO_JSON_ID_"], name: "ACT_FK_INFO_JSON_BA"
    t.index ["PROC_DEF_ID_"], name: "ACT_IDX_INFO_PROCDEF"
    t.index ["PROC_DEF_ID_"], name: "ACT_UNIQ_INFO_PROCDEF", unique: true
  end

  create_table "act_re_deployment", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "NAME_"
    t.string "CATEGORY_"
    t.string "KEY_"
    t.string "TENANT_ID_", default: ""
    t.timestamp "DEPLOY_TIME_", precision: 3
    t.string "ENGINE_VERSION_"
  end

  create_table "act_re_model", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "NAME_"
    t.string "KEY_"
    t.string "CATEGORY_"
    t.timestamp "CREATE_TIME_", precision: 3
    t.timestamp "LAST_UPDATE_TIME_", precision: 3
    t.integer "VERSION_"
    t.string "META_INFO_", limit: 4000
    t.string "DEPLOYMENT_ID_", limit: 64
    t.string "EDITOR_SOURCE_VALUE_ID_", limit: 64
    t.string "EDITOR_SOURCE_EXTRA_VALUE_ID_", limit: 64
    t.string "TENANT_ID_", default: ""
    t.index ["DEPLOYMENT_ID_"], name: "ACT_FK_MODEL_DEPLOYMENT"
    t.index ["EDITOR_SOURCE_EXTRA_VALUE_ID_"], name: "ACT_FK_MODEL_SOURCE_EXTRA"
    t.index ["EDITOR_SOURCE_VALUE_ID_"], name: "ACT_FK_MODEL_SOURCE"
  end

  create_table "act_re_procdef", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "CATEGORY_"
    t.string "NAME_"
    t.string "KEY_", null: false
    t.integer "VERSION_", null: false
    t.string "DEPLOYMENT_ID_", limit: 64
    t.string "RESOURCE_NAME_", limit: 4000
    t.string "DGRM_RESOURCE_NAME_", limit: 4000
    t.string "DESCRIPTION_", limit: 4000
    t.integer "HAS_START_FORM_KEY_", limit: 1
    t.integer "HAS_GRAPHICAL_NOTATION_", limit: 1
    t.integer "SUSPENSION_STATE_"
    t.string "TENANT_ID_", default: ""
    t.string "ENGINE_VERSION_"
    t.index ["KEY_", "VERSION_", "TENANT_ID_"], name: "ACT_UNIQ_PROCDEF", unique: true
  end

  create_table "act_ru_deadletter_job", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "TYPE_", null: false
    t.boolean "EXCLUSIVE_"
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROCESS_INSTANCE_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.string "EXCEPTION_STACK_ID_", limit: 64
    t.string "EXCEPTION_MSG_", limit: 4000
    t.timestamp "DUEDATE_", precision: 3
    t.string "REPEAT_"
    t.string "HANDLER_TYPE_"
    t.string "HANDLER_CFG_", limit: 4000
    t.string "TENANT_ID_", default: ""
    t.index ["EXCEPTION_STACK_ID_"], name: "ACT_FK_DEADLETTER_JOB_EXCEPTION"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_DEADLETTER_JOB_EXECUTION"
    t.index ["PROCESS_INSTANCE_ID_"], name: "ACT_FK_DEADLETTER_JOB_PROCESS_INSTANCE"
    t.index ["PROC_DEF_ID_"], name: "ACT_FK_DEADLETTER_JOB_PROC_DEF"
  end

  create_table "act_ru_event_subscr", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "EVENT_TYPE_", null: false
    t.string "EVENT_NAME_"
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "ACTIVITY_ID_", limit: 64
    t.string "CONFIGURATION_"
    t.timestamp "CREATED_", precision: 3, null: false
    t.string "PROC_DEF_ID_", limit: 64
    t.string "TENANT_ID_", default: ""
    t.index ["CONFIGURATION_"], name: "ACT_IDX_EVENT_SUBSCR_CONFIG_"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_EVENT_EXEC"
  end

  create_table "act_ru_execution", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "PROC_INST_ID_", limit: 64
    t.string "BUSINESS_KEY_"
    t.string "PARENT_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.string "SUPER_EXEC_", limit: 64
    t.string "ROOT_PROC_INST_ID_", limit: 64
    t.string "ACT_ID_"
    t.integer "IS_ACTIVE_", limit: 1
    t.integer "IS_CONCURRENT_", limit: 1
    t.integer "IS_SCOPE_", limit: 1
    t.integer "IS_EVENT_SCOPE_", limit: 1
    t.integer "IS_MI_ROOT_", limit: 1
    t.integer "SUSPENSION_STATE_"
    t.integer "CACHED_ENT_STATE_"
    t.string "TENANT_ID_", default: ""
    t.string "NAME_"
    t.datetime "START_TIME_", precision: 3
    t.string "START_USER_ID_"
    t.timestamp "LOCK_TIME_", precision: 3
    t.integer "IS_COUNT_ENABLED_", limit: 1
    t.integer "EVT_SUBSCR_COUNT_"
    t.integer "TASK_COUNT_"
    t.integer "JOB_COUNT_"
    t.integer "TIMER_JOB_COUNT_"
    t.integer "SUSP_JOB_COUNT_"
    t.integer "DEADLETTER_JOB_COUNT_"
    t.integer "VAR_COUNT_"
    t.integer "ID_LINK_COUNT_"
    t.index ["BUSINESS_KEY_"], name: "ACT_IDX_EXEC_BUSKEY"
    t.index ["PARENT_ID_"], name: "ACT_FK_EXE_PARENT"
    t.index ["PROC_DEF_ID_"], name: "ACT_FK_EXE_PROCDEF"
    t.index ["PROC_INST_ID_"], name: "ACT_FK_EXE_PROCINST"
    t.index ["ROOT_PROC_INST_ID_"], name: "ACT_IDC_EXEC_ROOT"
    t.index ["SUPER_EXEC_"], name: "ACT_FK_EXE_SUPER"
  end

  create_table "act_ru_identitylink", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "GROUP_ID_"
    t.string "TYPE_"
    t.string "USER_ID_"
    t.string "TASK_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.index ["GROUP_ID_"], name: "ACT_IDX_IDENT_LNK_GROUP"
    t.index ["PROC_DEF_ID_"], name: "ACT_IDX_ATHRZ_PROCEDEF"
    t.index ["PROC_INST_ID_"], name: "ACT_FK_IDL_PROCINST"
    t.index ["TASK_ID_"], name: "ACT_FK_TSKASS_TASK"
    t.index ["USER_ID_"], name: "ACT_IDX_IDENT_LNK_USER"
  end

  create_table "act_ru_job", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "TYPE_", null: false
    t.timestamp "LOCK_EXP_TIME_", precision: 3
    t.string "LOCK_OWNER_"
    t.boolean "EXCLUSIVE_"
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROCESS_INSTANCE_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.integer "RETRIES_"
    t.string "EXCEPTION_STACK_ID_", limit: 64
    t.string "EXCEPTION_MSG_", limit: 4000
    t.timestamp "DUEDATE_", precision: 3
    t.string "REPEAT_"
    t.string "HANDLER_TYPE_"
    t.string "HANDLER_CFG_", limit: 4000
    t.string "TENANT_ID_", default: ""
    t.index ["EXCEPTION_STACK_ID_"], name: "ACT_FK_JOB_EXCEPTION"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_JOB_EXECUTION"
    t.index ["PROCESS_INSTANCE_ID_"], name: "ACT_FK_JOB_PROCESS_INSTANCE"
    t.index ["PROC_DEF_ID_"], name: "ACT_FK_JOB_PROC_DEF"
  end

  create_table "act_ru_suspended_job", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "TYPE_", null: false
    t.boolean "EXCLUSIVE_"
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROCESS_INSTANCE_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.integer "RETRIES_"
    t.string "EXCEPTION_STACK_ID_", limit: 64
    t.string "EXCEPTION_MSG_", limit: 4000
    t.timestamp "DUEDATE_", precision: 3
    t.string "REPEAT_"
    t.string "HANDLER_TYPE_"
    t.string "HANDLER_CFG_", limit: 4000
    t.string "TENANT_ID_", default: ""
    t.index ["EXCEPTION_STACK_ID_"], name: "ACT_FK_SUSPENDED_JOB_EXCEPTION"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_SUSPENDED_JOB_EXECUTION"
    t.index ["PROCESS_INSTANCE_ID_"], name: "ACT_FK_SUSPENDED_JOB_PROCESS_INSTANCE"
    t.index ["PROC_DEF_ID_"], name: "ACT_FK_SUSPENDED_JOB_PROC_DEF"
  end

  create_table "act_ru_task", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.string "NAME_"
    t.string "PARENT_TASK_ID_", limit: 64
    t.string "DESCRIPTION_", limit: 4000
    t.string "TASK_DEF_KEY_"
    t.string "OWNER_"
    t.string "ASSIGNEE_"
    t.string "DELEGATION_", limit: 64
    t.integer "PRIORITY_"
    t.timestamp "CREATE_TIME_", precision: 3
    t.datetime "DUE_DATE_", precision: 3
    t.string "CATEGORY_"
    t.integer "SUSPENSION_STATE_"
    t.string "TENANT_ID_", default: ""
    t.string "FORM_KEY_"
    t.datetime "CLAIM_TIME_", precision: 3
    t.index ["CREATE_TIME_"], name: "ACT_IDX_TASK_CREATE"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_TASK_EXE"
    t.index ["PROC_DEF_ID_"], name: "ACT_FK_TASK_PROCDEF"
    t.index ["PROC_INST_ID_"], name: "ACT_FK_TASK_PROCINST"
  end

  create_table "act_ru_timer_job", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "TYPE_", null: false
    t.timestamp "LOCK_EXP_TIME_", precision: 3
    t.string "LOCK_OWNER_"
    t.boolean "EXCLUSIVE_"
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROCESS_INSTANCE_ID_", limit: 64
    t.string "PROC_DEF_ID_", limit: 64
    t.integer "RETRIES_"
    t.string "EXCEPTION_STACK_ID_", limit: 64
    t.string "EXCEPTION_MSG_", limit: 4000
    t.timestamp "DUEDATE_", precision: 3
    t.string "REPEAT_"
    t.string "HANDLER_TYPE_"
    t.string "HANDLER_CFG_", limit: 4000
    t.string "TENANT_ID_", default: ""
    t.index ["EXCEPTION_STACK_ID_"], name: "ACT_FK_TIMER_JOB_EXCEPTION"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_TIMER_JOB_EXECUTION"
    t.index ["PROCESS_INSTANCE_ID_"], name: "ACT_FK_TIMER_JOB_PROCESS_INSTANCE"
    t.index ["PROC_DEF_ID_"], name: "ACT_FK_TIMER_JOB_PROC_DEF"
  end

  create_table "act_ru_variable", primary_key: "ID_", id: :string, limit: 64, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "REV_"
    t.string "TYPE_", null: false
    t.string "NAME_", null: false
    t.string "EXECUTION_ID_", limit: 64
    t.string "PROC_INST_ID_", limit: 64
    t.string "TASK_ID_", limit: 64
    t.string "BYTEARRAY_ID_", limit: 64
    t.float "DOUBLE_", limit: 53
    t.bigint "LONG_"
    t.string "TEXT_", limit: 4000
    t.string "TEXT2_", limit: 4000
    t.index ["BYTEARRAY_ID_"], name: "ACT_FK_VAR_BYTEARRAY"
    t.index ["EXECUTION_ID_"], name: "ACT_FK_VAR_EXE"
    t.index ["PROC_INST_ID_"], name: "ACT_FK_VAR_PROCINST"
    t.index ["TASK_ID_"], name: "ACT_IDX_VARIABLE_TASK_ID"
  end

  create_table "tbl_sys_consigns", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.text "CONSIGNATION"
    t.string "PROCESS_INSTANCE_ID"
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.string "USER_ID"
    t.index ["USER_ID"], name: "fk_rails_d82e05c6d1"
  end

  create_table "tbl_sys_contracts", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.text "CONTRACTBODY"
    t.string "PROCESS_INSTANCE_ID"
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.string "USER_ID"
    t.index ["USER_ID"], name: "fk_rails_be4e4d328c"
  end

  create_table "tbl_sys_functions", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.string "FUNCTION_TYPE"
    t.string "FUNCTION_OBJECT"
  end

  create_table "tbl_sys_projects", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.string "USER_ID"
    t.string "CONSIGN_ID"
    t.string "CONTRACT_ID"
    t.string "TESTREPORT_ID"
    t.index ["CONSIGN_ID"], name: "fk_rails_b1d1c367cf"
    t.index ["CONTRACT_ID"], name: "fk_rails_c76fca73bb"
    t.index ["TESTREPORT_ID"], name: "fk_rails_5cac10b4ea"
    t.index ["USER_ID"], name: "fk_rails_35152f1ceb"
  end

  create_table "tbl_sys_role_functions", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "Role_id"
    t.string "Function_id"
    t.index ["Function_id"], name: "fk_rails_c5cb366aa5"
    t.index ["Role_id"], name: "fk_rails_adf8da6efd"
  end

  create_table "tbl_sys_role_users", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "Role_id", null: false
    t.string "User_id", null: false
    t.index ["Role_id"], name: "fk_rails_9d707ac889"
    t.index ["User_id"], name: "fk_rails_9aa1141d62"
  end

  create_table "tbl_sys_roles", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.string "CODE"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ROLE_NAME"
    t.string "DESCRIPTION"
    t.string "ROLE_STRING"
  end

  create_table "tbl_sys_testplans", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.text "PLAN"
    t.string "PROJECT_ID"
    t.index ["PROJECT_ID"], name: "fk_rails_aa6e13464a"
  end

  create_table "tbl_sys_testreports", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.text "REPORT"
  end

  create_table "tbl_sys_testresults", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "CODE"
    t.string "NAME"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.text "RESULT"
    t.string "PROJECT_ID"
    t.string "TESTPLAN_ID"
    t.index ["PROJECT_ID"], name: "fk_rails_f9185aa74c"
  end

  create_table "tbl_sys_users", id: :string, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "CODE"
    t.string "USERNAME"
    t.string "PASSWORD"
    t.string "ALTERED_TIME"
    t.string "ALTERED_USER_ID"
    t.string "CREATED_TIME"
    t.string "CREATED_USER_ID"
    t.string "NAME"
    t.string "SALT"
  end

  add_foreign_key "act_ge_bytearray", "act_re_deployment", column: "DEPLOYMENT_ID_", primary_key: "ID_", name: "ACT_FK_BYTEARR_DEPL"
  add_foreign_key "act_id_membership", "act_id_group", column: "GROUP_ID_", primary_key: "ID_", name: "ACT_FK_MEMB_GROUP"
  add_foreign_key "act_id_membership", "act_id_user", column: "USER_ID_", primary_key: "ID_", name: "ACT_FK_MEMB_USER"
  add_foreign_key "act_procdef_info", "act_ge_bytearray", column: "INFO_JSON_ID_", primary_key: "ID_", name: "ACT_FK_INFO_JSON_BA"
  add_foreign_key "act_procdef_info", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_INFO_PROCDEF"
  add_foreign_key "act_re_model", "act_ge_bytearray", column: "EDITOR_SOURCE_EXTRA_VALUE_ID_", primary_key: "ID_", name: "ACT_FK_MODEL_SOURCE_EXTRA"
  add_foreign_key "act_re_model", "act_ge_bytearray", column: "EDITOR_SOURCE_VALUE_ID_", primary_key: "ID_", name: "ACT_FK_MODEL_SOURCE"
  add_foreign_key "act_re_model", "act_re_deployment", column: "DEPLOYMENT_ID_", primary_key: "ID_", name: "ACT_FK_MODEL_DEPLOYMENT"
  add_foreign_key "act_ru_deadletter_job", "act_ge_bytearray", column: "EXCEPTION_STACK_ID_", primary_key: "ID_", name: "ACT_FK_DEADLETTER_JOB_EXCEPTION"
  add_foreign_key "act_ru_deadletter_job", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_DEADLETTER_JOB_PROC_DEF"
  add_foreign_key "act_ru_deadletter_job", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_DEADLETTER_JOB_EXECUTION"
  add_foreign_key "act_ru_deadletter_job", "act_ru_execution", column: "PROCESS_INSTANCE_ID_", primary_key: "ID_", name: "ACT_FK_DEADLETTER_JOB_PROCESS_INSTANCE"
  add_foreign_key "act_ru_event_subscr", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_EVENT_EXEC"
  add_foreign_key "act_ru_execution", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_EXE_PROCDEF"
  add_foreign_key "act_ru_execution", "act_ru_execution", column: "PARENT_ID_", primary_key: "ID_", name: "ACT_FK_EXE_PARENT", on_delete: :cascade
  add_foreign_key "act_ru_execution", "act_ru_execution", column: "PROC_INST_ID_", primary_key: "ID_", name: "ACT_FK_EXE_PROCINST", on_update: :cascade, on_delete: :cascade
  add_foreign_key "act_ru_execution", "act_ru_execution", column: "SUPER_EXEC_", primary_key: "ID_", name: "ACT_FK_EXE_SUPER", on_delete: :cascade
  add_foreign_key "act_ru_identitylink", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_ATHRZ_PROCEDEF"
  add_foreign_key "act_ru_identitylink", "act_ru_execution", column: "PROC_INST_ID_", primary_key: "ID_", name: "ACT_FK_IDL_PROCINST"
  add_foreign_key "act_ru_identitylink", "act_ru_task", column: "TASK_ID_", primary_key: "ID_", name: "ACT_FK_TSKASS_TASK"
  add_foreign_key "act_ru_job", "act_ge_bytearray", column: "EXCEPTION_STACK_ID_", primary_key: "ID_", name: "ACT_FK_JOB_EXCEPTION"
  add_foreign_key "act_ru_job", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_JOB_PROC_DEF"
  add_foreign_key "act_ru_job", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_JOB_EXECUTION"
  add_foreign_key "act_ru_job", "act_ru_execution", column: "PROCESS_INSTANCE_ID_", primary_key: "ID_", name: "ACT_FK_JOB_PROCESS_INSTANCE"
  add_foreign_key "act_ru_suspended_job", "act_ge_bytearray", column: "EXCEPTION_STACK_ID_", primary_key: "ID_", name: "ACT_FK_SUSPENDED_JOB_EXCEPTION"
  add_foreign_key "act_ru_suspended_job", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_SUSPENDED_JOB_PROC_DEF"
  add_foreign_key "act_ru_suspended_job", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_SUSPENDED_JOB_EXECUTION"
  add_foreign_key "act_ru_suspended_job", "act_ru_execution", column: "PROCESS_INSTANCE_ID_", primary_key: "ID_", name: "ACT_FK_SUSPENDED_JOB_PROCESS_INSTANCE"
  add_foreign_key "act_ru_task", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_TASK_PROCDEF"
  add_foreign_key "act_ru_task", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_TASK_EXE"
  add_foreign_key "act_ru_task", "act_ru_execution", column: "PROC_INST_ID_", primary_key: "ID_", name: "ACT_FK_TASK_PROCINST"
  add_foreign_key "act_ru_timer_job", "act_ge_bytearray", column: "EXCEPTION_STACK_ID_", primary_key: "ID_", name: "ACT_FK_TIMER_JOB_EXCEPTION"
  add_foreign_key "act_ru_timer_job", "act_re_procdef", column: "PROC_DEF_ID_", primary_key: "ID_", name: "ACT_FK_TIMER_JOB_PROC_DEF"
  add_foreign_key "act_ru_timer_job", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_TIMER_JOB_EXECUTION"
  add_foreign_key "act_ru_timer_job", "act_ru_execution", column: "PROCESS_INSTANCE_ID_", primary_key: "ID_", name: "ACT_FK_TIMER_JOB_PROCESS_INSTANCE"
  add_foreign_key "act_ru_variable", "act_ge_bytearray", column: "BYTEARRAY_ID_", primary_key: "ID_", name: "ACT_FK_VAR_BYTEARRAY"
  add_foreign_key "act_ru_variable", "act_ru_execution", column: "EXECUTION_ID_", primary_key: "ID_", name: "ACT_FK_VAR_EXE"
  add_foreign_key "act_ru_variable", "act_ru_execution", column: "PROC_INST_ID_", primary_key: "ID_", name: "ACT_FK_VAR_PROCINST"
  add_foreign_key "tbl_sys_consigns", "tbl_sys_users", column: "USER_ID"
  add_foreign_key "tbl_sys_contracts", "tbl_sys_users", column: "USER_ID"
  add_foreign_key "tbl_sys_projects", "tbl_sys_consigns", column: "CONSIGN_ID"
  add_foreign_key "tbl_sys_projects", "tbl_sys_contracts", column: "CONTRACT_ID"
  add_foreign_key "tbl_sys_projects", "tbl_sys_testreports", column: "TESTREPORT_ID"
  add_foreign_key "tbl_sys_projects", "tbl_sys_users", column: "USER_ID"
  add_foreign_key "tbl_sys_role_functions", "tbl_sys_functions", column: "Function_id"
  add_foreign_key "tbl_sys_role_functions", "tbl_sys_roles", column: "Role_id"
  add_foreign_key "tbl_sys_role_users", "tbl_sys_roles", column: "Role_id"
  add_foreign_key "tbl_sys_role_users", "tbl_sys_users", column: "User_id"
  add_foreign_key "tbl_sys_testplans", "tbl_sys_projects", column: "PROJECT_ID"
  add_foreign_key "tbl_sys_testresults", "tbl_sys_projects", column: "PROJECT_ID"
end
