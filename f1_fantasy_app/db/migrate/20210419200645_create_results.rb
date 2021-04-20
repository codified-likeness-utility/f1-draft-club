class CreateResults < ActiveRecord::Migration[6.1]
  def change
    create_table :results do |t|
      t.string :season
      t.string :round
      t.string :url
      t.string :race_name
      t.string :circuit_id
      t.string :circuit_name
      t.string :city
      t.string :country
      t.string :race_date
      t.string :driver_number
      t.string :position
      t.string :points
      t.string :permanentNumber
      t.string :driver_code
      t.string :grid_position
      t.string :laps
      t.string :status
      t.string :fastest_lap_rank
      t.integer :driver_id

      t.timestamps
    end
  end
end
