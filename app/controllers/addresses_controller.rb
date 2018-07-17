class AddressesController < ApplicationController
  helper_method :user


  def index
    # @shipping_add = user.addresses.find_by(address_type: "Shipping")
    # @billing_add = user.addresses.find_by(address_type: "Billing")
    # @message = user.messages.last
    # response = { :shipping_address => @shipping_address, :billing_address => @billing_address, :message => @message }
    # respond_to do |format|
    #   format.html { render :index }
    #   format.json  { render :json => response }
    # end
  end

  def new
    user.addresses.build(address_type: "Shipping")
    user.addresses.build(address_type: "Billing")
    user.messages.build
  end


  def create
    if user.update(address_params)
      #  flash[:notice] = "Your Order Was Successful"

       @shipping_add = user.addresses[-2]
       @billing_add = user.addresses[-1]
       @message = user.messages.last

       render 'addresses/index'

      else
        render :json => { :errors => user.errors.full_messages }, :status => 442
          flash[:error] = "Sorry. Your Order Did Not Go Through. Please key in your address again."
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
