class Release < ApplicationRecord

  validates :name, presence: true
  validates :overview, presence: true
  validates :vote_count, presence: true
  validates :poster_path, presence: true
  validates :release_date, presence: true
  validates :mdb_id, presence: true, uniqueness: true


  def self.get_upcoming_movies
    releases = Tmdb::Movie.upcoming
    releases.each do |r|
      release = Release.new 
      release.name = r.title
      release.overview = r.overview
      release.vote_count = r.vote_count
      release.poster_path =  r.backdrop_path
      release.release_date = r.release_date
      release.mdb_id = r.id
      release.save! if release.valid?
    end
  end
end