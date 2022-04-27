class CreateGffGamestat < ActiveRecord::Migration[6.0]
  def change
    create_table :gff_gamestat do |t|
      t.decimal :bestscore, null: false
      t.integer :playcount, null: false
      t.integer :gffuser_id, null: false
      t.integer :gffgame_id, null: false
    end
  end
end
