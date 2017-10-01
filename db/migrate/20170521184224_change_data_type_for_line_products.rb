class ChangeDataTypeForLineProducts < ActiveRecord::Migration[5.0]
  def change
    change_column :line_products, :quantity, :integer
  end
end
