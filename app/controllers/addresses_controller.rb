class AddressesController < ApplicationController
  helper_method :user

  def index
    @shipping_add = user.addresses.find_by(address_type: "Shipping")
    @billing_add = user.addresses.find_by(address_type: "Billing")
    @message = user.messages.last
  end

  def new
    user.addresses.build(address_type: "Shipping")
    user.addresses.build(address_type: "Billing")
    user.messages.build
  end

  def create
    if user.update(address_params)
      flash[:notice] = "Your Order Was Successful"
      redirect_to user_addresses_path(user)
    else
      flash[:error] = "Sorry. Your Order Did Not Go Through"
      render :new
    end
  end

    private

    def address_params
      params.require(:user).permit(:email, :addresses_attributes => [:street_1, :street_2, :city, :state, :zip_code, :address_type], :messages_attributes => [:content])
    end

    def user
      current_user
    end


end
