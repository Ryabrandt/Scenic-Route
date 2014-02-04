Scenicroute::Application.routes.draw do
  resources :trips, :users
  root "trips#index"  

end
