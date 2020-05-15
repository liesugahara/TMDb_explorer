class ChangeVoteCountType < ActiveRecord::Migration[6.0]
  def up
    change_column :releases, :vote_count, 'integer USING vote_count::integer'
    change_column :movies, :vote_count, 'integer USING vote_count::integer'
  end
  def down
    change_column :releases, :vote_count, :text
    change_column :movies, :vote_count, :text
  end
end
