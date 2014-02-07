class TripsController < ApplicationController
	#filter gets called before preventDefault works, restricts more than I want
	#before_filter :signed_in_user, only: [:create]    
	
	def index
		@trip = Trip.new
		@trips = Trip.all unless Trip.all.nil?
		
	end

	def new
	end

	def create
		if signed_in?		
			points = []
			trip = params.require(:trip).permit(:start, :end, :name)
			waypoints = params.require(:trip).permit(waypoints: [:lat, :long])
			waypoints["waypoints"].each_value {|value| points << value }
			new_trip = Trip.create(trip)

			points.each do |point|
				new_trip.waypoints.build(point).save
			end
		else
			flash[:notice] = "Please sign in to save travels"
		end
		redirect_to :back
	end

	def show
		@trip = Trip.new
		@trips = Trip.all unless Trip.all.nil?
		@new_trip = Trip.get_full_trip(params[:id])
		gon.trip = @new_trip

	end

	def about
	end

end
