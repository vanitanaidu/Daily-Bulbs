class AddPriceToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :price, :integer, default: 30, null: false
  end
end
