class Driver < ApplicationRecord
    has_many :user_fantasy_teams
    has_many :users, through: :user_fantasy_teams
    has_many :results
    has_many :standings
end
