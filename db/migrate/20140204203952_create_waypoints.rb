class CreateWaypoints < ActiveRecord::Migration
  def change
    create_table :waypoints do |t|
      t.string :lat
      t.string :long

      t.timestamps
    end
  end
end
