class CreateGffUser < ActiveRecord::Migration[6.0]
  def change
    create_table :gff_user do |t|
      t.string :username, null: false
      t.string :password, null: false
      t.datetime :create_at, null: false
    end
  end
end
