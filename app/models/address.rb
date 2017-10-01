class Address < ApplicationRecord


   belongs_to :user

   validates_presence_of :street_1, :message => "is required."
   validates_presence_of :city, :message => "is required."
   validates_presence_of :state, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
   validates :zip_code, presence: true, numericality: { only_integer: true,  message: "only takes numbers" }


end
