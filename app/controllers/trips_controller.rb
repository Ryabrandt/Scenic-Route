class TripsController < ApplicationController
	def index
		@trip = Trip.new
	end

	def new
	end

	def create
		trip = params.require(:trip).permit(:name, :waypoints)
		Trip.create(trip)
		redirect_to :root
	end

end
