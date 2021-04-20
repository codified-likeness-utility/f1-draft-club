class CreateUserFantasyTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :user_fantasy_teams do |t|
      t.string :name
      t.integer :budget
      t.integer :user_id
      

      t.timestamps
    end
  end
end
