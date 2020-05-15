class Movie < ApplicationRecord
  validates :name, presence: true
  validates :overview, presence: true
  validates :vote_count, presence: true
  validates :poster_path, presence: true
  validates :release_date, presence: true
  validates :mdb_id, presence: true, uniqueness: true
  
end