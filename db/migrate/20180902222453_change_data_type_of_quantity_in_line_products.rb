class ChangeDataTypeOfQuantityInLineProducts < ActiveRecord::Migration[5.0]
  def up
  change_column :line_products, :quantity, :integer
  end
  def down
    change_column :line_products, :quantity, :string
  end
end
