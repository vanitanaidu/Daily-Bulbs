class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :date_delivered, :price, :image_file_name, :image_content_type, :image_file_size, :image_updated_at
  has_many :carts
end
