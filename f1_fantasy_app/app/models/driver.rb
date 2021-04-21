class Driver < ApplicationRecord
    has_many :results
    has_many :standings
    has_many :team_picks
    has_many :user_fantasy_teams, through: :team_picks
end
