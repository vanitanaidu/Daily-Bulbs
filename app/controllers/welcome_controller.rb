class WelcomeController < ApplicationController

  def home
    @products = Product.all
  end


end
