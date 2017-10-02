class ProductsController < ApplicationController

    def index
      @products = Product.all
      render json: @products
    end

    def new
      @product = Product.new
      render json: @product
    end

    def create
      @product = Product.new(product_params)
      if @product.save
        flash[:notice] = "Successfully added new flower!"
        redirect_to @product
      else
        render :new
      end
      render json: @product
    end

    def show
      @product = Product.find(params[:id])
      @product = Product.date_match
      render json: @product

    end


      private

      def product_params
        params.require(:product).permit(:id, :name, :description, :date_delivered)
      end

end
