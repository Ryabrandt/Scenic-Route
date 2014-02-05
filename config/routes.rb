Scenicroute::Application.routes.draw do
  get "sessions/new"
  get "sessions/destroy"
  resources :trips, :users, :sessions
  root "trips#index"  
  get '/signup' => 'users#new'
  delete '/signout', to: 'sessions#destroy'
  get'/signin' => 'sessions#new'

end


#  Prefix Verb   URI Pattern               Controller#Action
#     trips GET    /trips(.:format)          trips#index
#           POST   /trips(.:format)          trips#create
#  new_trip GET    /trips/new(.:format)      trips#new
# edit_trip GET    /trips/:id/edit(.:format) trips#edit
#      trip GET    /trips/:id(.:format)      trips#show
#           PATCH  /trips/:id(.:format)      trips#update
#           PUT    /trips/:id(.:format)      trips#update
#           DELETE /trips/:id(.:format)      trips#destroy
#     users GET    /users(.:format)          users#index
#           POST   /users(.:format)          users#create
#  new_user GET    /users/new(.:format)      users#new
# edit_user GET    /users/:id/edit(.:format) users#edit
#      user GET    /users/:id(.:format)      users#show
#           PATCH  /users/:id(.:format)      users#update
#           PUT    /users/:id(.:format)      users#update
#           DELETE /users/:id(.:format)      users#destroy
#      root GET    /                         trips#index