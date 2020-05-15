class Api::V1::MoviesController < ApplicationController

  def index
    @movies = Movie.all
    render json: @movies
  end

  def create
    if params[:mdb_id]
      mdb_id = params[:mdb_id]
      movies_count =  Movie.where(mdb_id: mdb_id).count == 1 
      return render json: {errors: "id already exists"}, status: 409 if movies_count
  
      release = Release.where(mdb_id: mdb_id).first
      return render json: {errors: "id does not exist"}, status: 404 if release.nil?
  
      @movie = Movie.create(release.attributes) if release.attributes

      if @movie.save!
        render json: @movie
      else
        render json: {errors: @movie.errors.full_messages}, status: :unprocessable_entity
      end
    elsif params[:name]
      name = params[:name]
      movies_count =  Movie.where(name: name).count == 1 
      return render json: {errors: "movie already exists"}, status: 409 if movies_count

      release = Release.where(name: name).first
      return render json: {errors: "movie does not exist"}, status: 404 if release.nil?

      @movie = Movie.create(release.attributes) if release.attributes
      if @movie.save!
        render json: @movie
      else
        render json: {errors: @movie.errors.full_messages}, status: :unprocessable_entity
      end
    end
    
  end


  def movie_filter
    filter_by = params[:filter_by]
    filter = params[:filter]
    @movies = filter_by == "vote_count" ? Movie.where("#{filter_by}  >= ?", filter ) : Movie.where("#{filter_by} ILIKE ?", "%#{filter}%") 
    render json: @movies
  end

  def date_filter
    filter = params[:filter] if params[:filter]
    if params[:start_date] && params[:end_date]
      start_date = Date.strptime(params[:start_date], '%Y-%m-%d')
      end_date = Date.strptime(params[:end_date], '%Y-%m-%d')
      @movies = Movie.where(release_date: start_date..end_date+1).all
    elsif filter == "next_week"
      @movies = Movie.where(release_date: Date.today.next_week..Date.today.next_week.end_of_week).all
    elsif filter == "next_month"
      @movies = Movie.where(release_date: Date.today.next_month.beginning_of_month..Date.today.next_month.end_of_month).all
    else
      @movies = Movie.where(release_date: filter).all
    end
    render json: @movies
  end

  def titles
    filter = params[:name]
    @titles = Release.where("name ILIKE ?", "%#{filter}%").pluck(:name)
    render json: @titles
  end

  private
  def movie_params
    params.require(:movie).permit(:name, :overview, :vote_count, :poster_path, :release_date, :filter, :mdb_id, :start_date, :end_date)
  end
end
