class CreateDrivers < ActiveRecord::Migration[6.1]
  def change
    create_table :drivers do |t|
      t.string :driverId
      t.string :permanentNumber
      t.string :code
      t.string :url
      t.string :givenName
      t.string :familyName
      t.string :dateOfBirth
      t.string :nationality
      t.boolean :turbo_driver

      t.timestamps
    end
  end
end

