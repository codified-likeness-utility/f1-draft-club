class DriversController < ApplicationController

    def index
        drivers = Driver.all
        render json: drivers, include: [:standings, :results]
    end

    def show
        driver = Driver.find_by(id: params[:id])
        render json: driver
    end

    def update
        driver = Driver.find_by(id: params[:id])
        driver.update(turbo_driver: params[:turbo_driver])
        render json: driver
    end

end
