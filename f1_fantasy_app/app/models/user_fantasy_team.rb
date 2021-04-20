class UserFantasyTeam < ApplicationRecord
    belongs_to :user
    has_many :team_picks
end
