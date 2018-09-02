class RemoveQuantityFromLineProducts < ActiveRecord::Migration[5.0]
  def change
     remove_column :line_products, :quantity, :integer
  end
end
