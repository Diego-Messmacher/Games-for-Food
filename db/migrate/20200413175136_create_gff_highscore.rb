class CreateGffHighscore < ActiveRecord::Migration[6.0]
  def change
    create_table :gff_highscore do |t|
      t.string :score, null: false
      t.datetime :create_at, null: false
      t.integer :gffuser_id, null: false
      t.integer :gffgame_id, null: false
    end
  end
end
