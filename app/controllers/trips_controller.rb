class TripsController < ApplicationController
	def index
		@trip = Trip.new
	end

	def new
	end

	def create
		trip = params.require(:trip).permit(:start, :end)
		Trip.create(trip)
		redirect_to :root
	end

end
