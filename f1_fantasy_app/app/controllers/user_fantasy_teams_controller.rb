class UserFantasyTeamsController < ApplicationController

    def index
        user_fantasy_teams = UserFantasyTeam.all
        render json: user_fantasy_teams, include: [drivers: {include: :standings}]
    end

    def show
        user_fantasy_teams = UserFantasyTeam.find_by(id: params[:id])
        render json: user_fantasy_teams, include: [:team_picks]
    end

    def update
        user_fantasy_teams = UserFantasyTeam.find_by(id: params[:id])
        user_fantasy_teams = UserFantasyTeam.update(
            name: params[:name],
            budget: params[:budget]
        )
        render json: user_fantasy_teams
    end

end
