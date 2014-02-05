class Trip < ActiveRecord::Base
	has_many :waypoints

	def self.get_full_trip(param)
		my_trip = Trip.find(param)
		full_trip = []
		full_trip << my_trip.start
		my_trip.waypoints.each do |waypoint|
			full_trip << waypoint.lat
			full_trip << waypoint.long
		end
		full_trip << my_trip.end
	end
end
