class CreateStandings < ActiveRecord::Migration[6.1]
  def change
    create_table :standings do |t|
      t.string :season
      t.string :roundNumber
      t.string :racePosition
      t.string :positionText
      t.string :points
      t.string :wins
      t.string :permanentNumber
      t.integer :driver_id

      t.timestamps
    end
  end
end


