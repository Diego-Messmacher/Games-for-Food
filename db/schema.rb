# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_16_195142) do

  create_table "colorwayz_stat", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "num_moves"
    t.integer "max_moves"
    t.datetime "earned_at"
    t.integer "gffuser_id"
  end

  create_table "gff_game", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "gff_gamestat", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.decimal "bestscore", precision: 10, null: false
    t.integer "playcount", null: false
    t.integer "gffuser_id", null: false
    t.integer "gffgame_id", null: false
  end

  create_table "gff_highscore", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "score", null: false
    t.datetime "create_at", null: false
    t.integer "gffuser_id", null: false
    t.integer "gffgame_id", null: false
  end

  create_table "gff_user", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "username", null: false
    t.string "password", null: false
    t.datetime "create_at", null: false
  end

end
