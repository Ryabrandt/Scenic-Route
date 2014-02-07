Scenicroute::Application.routes.draw do
  get "sessions/new"
  get "sessions/destroy"
  resources :trips, :users, :sessions
  root "trips#index"  
  get '/signup' => 'users#new'
  delete '/signout', to: 'sessions#destroy'
  get'/signin' => 'sessions#new'
  get'/about', to: 'trips#about'
end
