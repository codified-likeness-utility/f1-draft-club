Rails.application.routes.draw do
  resources :schedules
  resources :results
  resources :standings
  resources :drivers
  resources :team_picks
  resources :user_fantasy_teams
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
