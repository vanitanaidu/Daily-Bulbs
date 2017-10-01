def s3_region
  region = @options[:s3_region]
  region = region.call(self) if region.is_a?(Proc)

  region || s3_credentials[:s3_region]
end


# def s3_host_name
#   host_name = @options[:s3_host_name]
#   host_name = host_name.call(self) if host_name.is_a?(Proc)
#
#   host_name || s3_credentials[:s3_host_name] || "s3.amazonaws.com".freeze
# end
