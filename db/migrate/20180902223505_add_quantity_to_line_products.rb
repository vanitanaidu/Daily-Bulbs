class AddQuantityToLineProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :line_products, :quantity, :integer
  end
end
