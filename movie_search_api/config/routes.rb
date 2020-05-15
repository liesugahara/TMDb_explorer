Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :movies, only: [:create, :index] do
        get 'movie_filter', on: :collection
        get 'date_filter', on: :collection
        get 'titles', on: :collection
      end
    end
  end
end
