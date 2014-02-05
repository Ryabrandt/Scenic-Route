class TripsController < ApplicationController
	def index
		@trip = Trip.new
	end

	def new
	end

	def create
		#raise params.inspect
		points = []
		trip = params.require(:trip).permit(:start, :end) #refactor
		waypoints = params.require(:trip).permit(waypoints: [:lat, :long])
		waypoints["waypoints"].each_value {|value| points << value }
		new_trip = Trip.create(trip)

		points.each do |point|
			new_trip.waypoints.build(point).save
		end
		redirect_to :back
	end

end
