# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'byebug'
require 'rest-client'
require 'json'

User.destroy_all
Driver.destroy_all
Schedule.destroy_all
UserFantasyTeam.destroy_all
Standing.destroy_all
Result.destroy_all
TeamPick.destroy_all


########## USER SEEDS ##########

User.create(name: 'codified-likeness-utility', email: 'mr.daviesian@gmail.com', password: 'password123')
User.create(name: 'fast-luis', email: 'lozano_22_lalo@yahoo.com', password: 'password456')

# ########## DRIVER SEEDS ##########

driver_response = RestClient.get 'http://ergast.com/api/f1/2021/drivers.json'
data = JSON.parse(driver_response)
    drivers =  data["MRData"]["DriverTable"]["Drivers"]

        drivers.each do |driver|
            Driver.create(
                driverId: driver["driverId"],
                permanentNumber: driver["permanentNumber"],
                code: driver["code"],
                url: driver["url"],
                givenName: driver["givenName"],
                familyName: driver["familyName"],
                dateOfBirth: driver["dateOfBirth"],
                nationality: driver["nationality"],
                turbo_driver: false,
                salary: rand(5000000...35000000)
            )
        end

# ########### SCHEDULE SEEDS ##########

schedule_response = RestClient.get 'http://ergast.com/api/f1/current.json'
schedule_data = JSON.parse(schedule_response)
schedules = schedule_data["MRData"]["RaceTable"]["Races"]

    schedules.each do |schedule|
        Schedule.create(
            season: schedule["season"],
            round: schedule["round"],
            url: schedule["url"],
            circuitName: schedule["Circuit"]["circuitName"],
            locality: schedule["Circuit"]["Location"]["locality"],
            country: schedule["Circuit"]["Location"]["country"],
            date: schedule["date"],
            time: schedule["time"]
        )
    end

    ########### USER_FANTASY_TEAM SEEDS ##########

UserFantasyTeam.create(name: "Racing Rockets", budget: 100000000, user_id: User.first.id)
UserFantasyTeam.create(name: "Speedsters", budget: 100000000, user_id: User.second.id)


########## STANDING SEEDS ##########

standing_response = RestClient.get 'http://ergast.com/api/f1/current/driverStandings.json'
standing_data = JSON.parse(standing_response)
    season_data = standing_data["MRData"]["StandingsTable"]["StandingsLists"]
    standings = season_data[0]["DriverStandings"]

        standings.each do |standing|
            
            driver_permanent_number = standing["Driver"]["permanentNumber"]
            @current_driver = Driver.find_by(permanentNumber: driver_permanent_number)

                Standing.create(
                    season: season_data[0]["season"],
                    roundNumber: season_data[0]["round"],
                    racePosition: standing["position"],
                    positionText: standing["positionText"],
                    points: standing["points"],
                    wins: standing["wins"],
                    permanentNumber: standing["Driver"]["permanentNumber"],
                    driver_id: @current_driver.id
                )
            end

# ########## RESULT SEEDS ##########

result_respose = RestClient.get 'http://ergast.com/api/f1/current/last/results.json'
result_data = JSON.parse(result_respose)

    race_datas = result_data["MRData"]["RaceTable"]["Races"]
    race_results = result_data["MRData"]["RaceTable"]["Races"][0]["Results"]

        race_results.each do |race_result|
            lap_rank = race_result["FastestLap"]
            if lap_rank
                
                result_driver_permanent_number = race_result["Driver"]["permanentNumber"]
                @result_current_driver = Driver.find_by(permanentNumber: result_driver_permanent_number)

                Result.create(
                    season: race_datas[0]["season"],
                    round: race_datas[0]["round"],
                    url: race_datas[0]["url"],
                    race_name: race_datas[0]["raceName"],
                    circuit_id: race_datas[0]["Circuit"]["circuitId"],
                    circuit_name: race_datas[0]["Circuit"]["circuitName"],
                    city: race_datas[0]["Circuit"]["Location"]["locality"],
                    country: race_datas[0]["Circuit"]["Location"]["country"],
                    race_date: race_datas[0]["date"],
                    driver_number: race_result["number"],
                    position: race_result["position"],
                    points: race_result["points"],
                    permanentNumber: race_result["Driver"]["permanentNumber"],
                    driver_code: race_result["Driver"]["code"],
                    grid_position: race_result["grid"],
                    laps: race_result["laps"],
                    status: race_result["status"],
                    fastest_lap_rank: race_result["FastestLap"]["rank"],
                    driver_id: @result_current_driver.id
                )
            end
        end


