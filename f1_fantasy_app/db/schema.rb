# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_19_200725) do

  create_table "drivers", force: :cascade do |t|
    t.string "driverId"
    t.string "permanentNumber"
    t.string "code"
    t.string "url"
    t.string "givenName"
    t.string "familyName"
    t.string "dateOfBirth"
    t.string "nationality"
    t.boolean "turbo_driver"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "results", force: :cascade do |t|
    t.string "season"
    t.string "round"
    t.string "url"
    t.string "race_name"
    t.string "circuit_id"
    t.string "circuit_name"
    t.string "city"
    t.string "country"
    t.string "race_date"
    t.string "driver_number"
    t.string "position"
    t.string "points"
    t.string "permanentNumber"
    t.string "driver_code"
    t.string "grid_position"
    t.string "laps"
    t.string "status"
    t.string "fastest_lap_rank"
    t.integer "driver_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "schedules", force: :cascade do |t|
    t.string "season"
    t.string "round"
    t.string "url"
    t.string "circuitName"
    t.string "locality"
    t.string "country"
    t.string "date"
    t.string "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "standings", force: :cascade do |t|
    t.string "season"
    t.string "roundNumber"
    t.string "racePosition"
    t.string "positionText"
    t.string "points"
    t.string "wins"
    t.string "permanentNumber"
    t.integer "driver_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "team_picks", force: :cascade do |t|
    t.integer "driver_id"
    t.integer "standing_id"
    t.integer "result_id"
    t.integer "user_fantasy_team_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_fantasy_teams", force: :cascade do |t|
    t.string "name"
    t.integer "budget"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
