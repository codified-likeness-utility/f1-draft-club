class UserFantasyTeam < ApplicationRecord
    belongs_to :user
    has_many :team_picks
    has_many :drivers, through: :team_picks
    has_many :standings, through: :team_picks
    has_many :results, through: :team_picks
end
