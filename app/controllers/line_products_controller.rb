class LineProductsController < ApplicationController
   helper_method :product

    def new
      product = Product.date_match
      @line_product = product.line_products.build
    end

    def create
      cart = current_user.current_cart ||= Cart.new
      @line_product = cart.add_product(line_params)
      if @line_product.save
        redirect_to cart_path(current_user.current_cart)
      else
        render :new
      end
    end

    def show
    end

      private

      def product
        Product.date_match
      end

      def line_params
        params.require(:line_product).permit(:quantity, :product_id)
      end


end
