class AddMdbIdToMovies < ActiveRecord::Migration[6.0]
  def change
    add_column :movies, :mdb_id, :integer
  end
end
