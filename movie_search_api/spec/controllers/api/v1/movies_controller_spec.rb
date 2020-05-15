require 'rails_helper'

describe Api::V1::MoviesController, type: :controller do

  before(:each) do
      @release1 = create :release
      @release2 = create :release2
      @release3 = create :release3
      @release4 = create :release4
      @release5 = create :release5
  end
  
  it 'should create a movie', :debug do
    post :create, params: {mdb_id: 639798}

    expect(response.status).to eq(200)
    movie = Movie.find(json['id'])
    expect(json['id']).to eq(movie.id)
  
  end

  it 'should not create a movie if it already exists' do
    create :movie
    post :create, params: {mdb_id: 639798}

    expect(response.status).to eq(409)
  end
  it 'should not create a movie if it does not exist' do
    create :movie
    post :create, params: {mdb_id: 111111}

    expect(response.status).to eq(404)
  end

  it 'should create a movie movie search', :debug do
    post :create, params: {name: "32"}

    expect(response.status).to eq(200)
    expect(json.length).to eq(1)
  
  end

  it 'should filter by overview', :debug do
    movie1 = create :movie
    create :movie2
    create :movie3

    overview = "Inspired by real events,"
    get :movie_filter, params: {filter: overview, filter_by: "overview"}
    expect(response.status).to eq(200)
    movies = Movie.all
    expect(movies.count).to eq(3)
    expect(json.length).to eq(1)
    expect(json[0]["mdb_id"]).to eq(movie1.mdb_id)
  end

  it 'should filter by vote count', :debug do
    movie1 = create :movie
    create :movie2
    create :movie3

    get :movie_filter, params: {filter: 1500, filter_by: "vote_count"}
    expect(response.status).to eq(200)
    movies = Movie.all
    expect(movies.count).to eq(3)
    expect(json.length).to eq(1)
    expect(json[0]["mdb_id"]).to eq(movie1.mdb_id)
  end
  context 'filter by date' do
    before(:each) do
      @movie1 = create :movie
      @movie2 = create :movie2
      @movie3 = create :movie3
      @movie4 = create :movie4
      @movie5 = create :movie5
      movies = Movie.all
      expect(movies.count).to eq(5)
    end

    it 'should get movies released tomorrow', :debug do
      tomorrow = (Date.today + 1.days).strftime('%Y-%m-%d')
      get :date_filter, params: {filter: tomorrow}
      expect(response.status).to eq(200)
      expect(json.length).to eq(1)
      expect(json[0]["mdb_id"]).to eq(@movie1.mdb_id)
    end
    it 'should get movies released next week', :debug do

      get :date_filter, params: {filter: "next_week"}
      expect(response.status).to eq(200)
      expect(json.length).to eq(2)
      expect(json[0]["mdb_id"]).to eq(@movie2.mdb_id)
    end
    it 'should get movies released next month', :debug do

      get :date_filter, params: {filter: "next_month"}
      expect(response.status).to eq(200)
      expect(json.length).to eq(2)
      expect(json[0]["mdb_id"]).to eq(@movie4.mdb_id)
    end
    it 'should get movies released in a custom range', :debug do
      start_date = (Date.today + 3.days).strftime('%Y-%m-%d')
      end_date = (Date.today + 15.days).strftime('%Y-%m-%d')
      get :date_filter, params: {start_date: start_date, end_date: end_date}
      expect(response.status).to eq(200)
      expect(json.length).to eq(2)
    end
  end
end