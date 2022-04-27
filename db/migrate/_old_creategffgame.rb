class CreateGffGame < ActiveRecord::Migration[6.0]
  def change
    create_table :gff_game do |t|
      t.string :name, null: false
    end
  end
end
