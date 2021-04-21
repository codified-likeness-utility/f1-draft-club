class TeamPicksController < ApplicationController

    def index
        team_picks = TeamPick.all 
        render json: team_picks, include: [:driver]
    end

    def create
        new_team_pick = TeamPick.create(
            driver_id: params[:driver_id],
            standing_id: params[:standing_id],
            result_id: params[:result_id],
            user_fantasy_team_id: params[:user_fantasy_team_id]
        )
        render json: new_team_pick
    end


end