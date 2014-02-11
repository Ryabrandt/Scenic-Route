source 'https://rubygems.org'
ruby '2.0.0'
gem 'rails', '4.0.2'
gem 'pg'
gem 'sass-rails', '~> 4.0.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 1.2'
gem 'gon'

group :production do
	gem 'rails_12factor'
end

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end
gem 'bcrypt-ruby', '~> 3.1.2'
group :development, :test do
gem 'dotenv-rails'
  gem 'rspec-rails', '~> 3.0.0.beta'
  gem 'launchy'
  gem 'database_cleaner'
  gem 'rb-fsevent', require: false if RUBY_PLATFORM =~ /darwin/i  
  gem 'guard-rspec' 
  gem 'guard-livereload'
  gem 'annotate'
  gem 'pry'
end

gem 'json'
