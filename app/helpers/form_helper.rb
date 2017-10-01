module FormHelper

  def setup_user(user)
   user ||= User.new
   user
  end



end
