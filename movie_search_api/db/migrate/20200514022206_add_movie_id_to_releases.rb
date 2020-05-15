class AddMovieIdToReleases < ActiveRecord::Migration[6.0]
  def change
    add_column :releases, :mdb_id, :integer
  end
end
