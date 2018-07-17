class ProductsController < ApplicationController

  def home
    @products = Product.all
  end

    def index
      all_products = Product.all
      @products = all_products.sort {|x,y| x.date_delivered <=> y.date_delivered }
      respond_to do |format|
        format.html { render :index }
        format.json { render json: @products}
      end
    end

    def new
      @product = Product.new
    end

    def create
      @product = Product.new(product_params)
      if @product.save
        flash[:notice] = "Successfully added a new flower!"
        redirect_to @product
      else
        render :new
      end
    end

    def show
      @product = Product.date_match
    end


      private

      def product_params
        params.require(:product).permit(:id, :name, :description, :date_delivered)
      end

end
