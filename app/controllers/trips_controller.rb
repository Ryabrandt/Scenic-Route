class TripsController < ApplicationController

	#make before filters
	def index
		@trip = Trip.new
		@trips = Trip.all unless Trip.all.nil?
		
	end

	def new
	end

	def create
		#raise params.inspect
		points = []
		trip = params.require(:trip).permit(:start, :end, :name)
		waypoints = params.require(:trip).permit(waypoints: [:lat, :long])
		waypoints["waypoints"].each_value {|value| points << value }
		new_trip = Trip.create(trip)

		points.each do |point|
			new_trip.waypoints.build(point).save
		end
		redirect_to :back
	end

	def show
		@trip = Trip.new
		@trips = Trip.all unless Trip.all.nil?
		@new_trip = Trip.get_full_trip(params[:id])
		gon.trip = @new_trip

	end


end
