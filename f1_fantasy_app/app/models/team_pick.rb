class TeamPick < ApplicationRecord
    belongs_to :driver
    belongs_to :standing
    belongs_to :result
    belongs_to :user_fantasy_team
end

