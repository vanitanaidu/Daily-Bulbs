Rails.application.routes.draw do


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }


  root 'products#home'


  resources :products
  post "/products/new", to: "products#new"

  resources :line_products, only: [:new, :create, :show, :index]

  resources :carts
  get 'carts/:id/checkout', to: 'carts#checkout'
  post 'carts/:id/checkout', to: 'carts#checkout', as: 'checkout'

  get 'users/:id/thank_you', to: 'users#thank_you'
  post 'users/:id/thank_you', to: 'users#thank_you', as: 'thank_you'


  resources :users do
    resources :products
    resources :addresses
      resources :messages
  end



end
