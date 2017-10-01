class Product < ApplicationRecord

  has_many :line_products
  has_many :carts, through: :line_products


  validates :name, presence: true
  validates :description, presence: true
  validates :date_delivered, presence: true


  validates_uniqueness_of :date_delivered
  validate :delivery_date_cannot_be_in_the_past


    def self.date_match
      Product.where('DATE(date_delivered) = ?', Date.today).take
    end


    def delivery_date_cannot_be_in_the_past
      if date_delivered.present? && date_delivered < Date.today
       end
    end

    def delivery_date
      self.date_delivered.strftime("%B %e, %Y")
    end

end
