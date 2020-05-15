class CreateReleases < ActiveRecord::Migration[6.0]
  def change
    create_table :releases do |t|
      t.string :name
      t.text :overview
      t.text :vote_count
      t.text :poster_path
      t.datetime :release_date
      t.timestamps
    end
  end
end
