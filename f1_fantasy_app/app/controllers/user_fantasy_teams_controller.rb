class UserFantasyTeamsController < ApplicationController

    def index
        user_fantasy_teams = UserFantasyTeam.all
        render json: user_fantasy_teams, include: [drivers: {include: :standings}]
    end

    def show
        user_fantasy_teams = UserFantasyTeam.find_by(id: params[:id])
        render json: user_fantasy_teams, include: [:team_picks]
    end

end
