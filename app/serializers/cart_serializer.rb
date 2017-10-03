class CartSerializer < ActiveModel::Serializer
  attributes :id, :status
  belongs_to :user
  has_many :products
end
