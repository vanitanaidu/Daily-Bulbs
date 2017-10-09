class LineProductsController < ApplicationController
   helper_method :product

    def new
      @line_product = product.line_products.build
      render :template => "line_products/error_msg.html.erb", layout: false
    end

    def create
      cart = current_user.current_cart ||= Cart.new
      @line_product = cart.add_product(line_params)
      if @line_product.save
        #  redirect_to cart_path(current_user.current_cart)
         render json: @line_product
      else
        render :json => { :errors => @line_product.errors.full_messages }, :status => 442
        # render :template => "line_products/error_msg.html.erb", layout: false 
      end
    end

    def show
    end

      private

      def product
        Product.date_match
      end

      def line_params
        params.require(:line_product).permit(:id, :quantity, :product_id)
      end


end
