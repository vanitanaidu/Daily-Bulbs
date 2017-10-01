class AddStatusToCarts < ActiveRecord::Migration[5.0]
  def change
    add_column :carts, :status, :string, default: "not submitted"
  end
end
