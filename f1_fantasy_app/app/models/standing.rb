class Standing < ApplicationRecord
    belongs_to :driver
    has_many :team_picks
    has_many :user_fantasy_teams, through: :team_picks
end
