class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.string :season
      t.string :round
      t.string :url
      t.string :circuitName
      t.string :locality
      t.string :country
      t.string :date
      t.string :time

      t.timestamps
    end
  end
end
