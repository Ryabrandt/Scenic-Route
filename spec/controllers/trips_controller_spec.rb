require 'spec_helper'

describe TripsController do

	describe "GET root" do
		it "should redirect to the trip index" do
			pending
			# how to have it send to the root from rspec?
		end
	end

	describe "GET index" do
	  before(:each) do
	  	@trip = mock_model("Trip")
	  	allow(Trip).to receive(:new).and_return(@trip)
	  	allow(Trip).to receive(:all).and_return(@trip)
	  end

		it "returns http success" do
			get "index"
			expect(response).to be_success
		end
	
		it "displays all trips on visiting" do
			allow(Trip).to receive(:all)
		end


	end






	describe "POST create" do
		before(:each) do
  		todo = mock_model("Trip")
  		allow(Trip).to receive(:create)
	end

	end

	describe "GET show" do
	end

	describe "GET about" do
		it "should render the about view" do
			get :about
			expect(response).to render_template(:about)
		end
	end

end

