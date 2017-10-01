class Cart < ApplicationRecord

  belongs_to :user

  has_many :line_products
  has_many :products, through: :line_products


    def total
      total = 0
      self.line_products.each do |line_product|
        total += line_product.product.price * line_product.quantity
      end
      total
    end

    def add_product(line_params)
      current_product = line_products.find_by(product_id: line_params[:product_id])
        if current_product
          current_product.quantity += line_params[:quantity].to_i
          current_product.save
        else
          current_product = line_products.new
          current_product.quantity = line_params[:quantity]
          current_product.product_id = line_params[:product_id]
          current_product.save
        end
        current_product
     end

     def checkout
      self.status = "submitted"
     end


end
