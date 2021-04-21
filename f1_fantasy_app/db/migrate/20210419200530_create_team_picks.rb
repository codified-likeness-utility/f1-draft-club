class CreateTeamPicks < ActiveRecord::Migration[6.1]
  def change
    create_table :team_picks do |t|
      t.integer :driver_id
      t.integer :standing_id
      t.integer :result_id
      t.integer :user_fantasy_team_id

      t.timestamps
    end
  end
end
