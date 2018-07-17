class LineProduct < ApplicationRecord

  belongs_to :cart
  belongs_to :product


  validates :quantity, numericality: {only_integers: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10, message: "must be a number and 1 - 10."}



end
