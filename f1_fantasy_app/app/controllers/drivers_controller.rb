class DriversController < ApplicationController

    def index
        drivers = Driver.all
        render json: drivers, include: [:standings, :results]
    end

end
