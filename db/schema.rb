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

ActiveRecord::Schema.define(version: 20180902223505) do

  create_table "addresses", force: :cascade do |t|
    t.string   "street_1"
    t.string   "street_2"
    t.string   "city"
    t.string   "state"
    t.integer  "zip_code"
    t.string   "address_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
  end

  create_table "carts", force: :cascade do |t|
    t.string   "user_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "status",     default: "not submitted"
  end

  create_table "line_products", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "cart_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "quantity"
  end

  create_table "messages", force: :cascade do |t|
    t.text    "content"
    t.integer "user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "date_delivered"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "price",          default: 30, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.integer  "current_cart_id"
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "admin",                  default: false
    t.string   "provider"
    t.string   "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["provider"], name: "index_users_on_provider"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid"], name: "index_users_on_uid"
  end

end
