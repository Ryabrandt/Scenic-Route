class AddTripToWaypoints < ActiveRecord::Migration
  def change
    add_reference :waypoints, :trip, index: true
  end
end
