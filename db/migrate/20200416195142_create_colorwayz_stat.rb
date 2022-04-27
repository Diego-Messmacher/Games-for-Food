class CreateColorwayzStat < ActiveRecord::Migration[6.0]
  def change
    create_table :colorwayz_stat do |t|
        t.integer :num_moves
        t.integer :max_moves
        t.datetime :earned_at
        t.integer :gffuser_id
      end
  end
end
