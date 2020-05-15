require 'open-uri'
require 'tempfile'

FactoryBot.define do

  factory :movie do
    name {"32 Malasana Street"}
    overview {"Inspired by real events, the story centers around a family in the 70s who settles in the Madrid neighborhood of Malasaña where their new house will become the worst of their nightmares."}
    poster_path {"/59b4PaPaI52LJJRNRtG3ALyUvJU.jpg"}
    release_date { Date.today + 1.days}
    mdb_id {639798}
    vote_count {2000}
    factory :movie2 do
      name {"Underwater"}
      overview {"After an earthquake destroys their underwater station, six researchers must navigate two miles along the dangerous, unknown depths of the ocean floor to make it to safety in a race against time."}
      poster_path {"/ww7eC3BqSbFsyE5H5qMde8WkxJ2.jpg"}
      release_date {Date.today + 7.days}
      vote_count {1079}
      mdb_id {443791}
    end
    factory :movie3 do
      name {"Emma."}
      overview {"In 1800s England, a well-meaning but selfish young woman meddles in the love lives of her friends."}
      poster_path {"/5GbkL9DDRzq3A21nR7Gkv6cFGjq.jpg"}
      release_date {Date.today + 7.days}
      vote_count {256}
      mdb_id {556678}
    end
    factory :movie4 do
      name {"Broil"}
      overview {"Broil follows a dysfunctional family of demons vying to control the future of their wealth."}
      poster_path {"/qK6xEaXhawKlVmQwtMO7wtdiU6Z.jpg"}
      release_date {Date.today.next_month}
      vote_count {0}
      mdb_id {669770}
    end
    factory :movie5 do
      name {"La belle époque"}
      overview {"Victor, a disillusioned sexagenarian, sees his life turned upside down on the day when Antoine, a brilliant entrepreneur, offers him a new kind of attraction: mixing theatrical artifices and historical reconstruction, this company offers his clients a chance to dive back into the era of their choice. Victor then chose to relive the most memorable week of his life: the one where, 40 years earlier, he met the great love."}
      poster_path {"/zofCXkSIruI8PsTWKiONIa2RI57.jpg"}
      release_date {Date.today.next_month}
      vote_count {315}
      mdb_id {595975}
    end
  end

  factory :release do
    name {"32 Malasana Street"}
    overview {"Inspired by real events, the story centers around a family in the 70s who settles in the Madrid neighborhood of Malasaña where their new house will become the worst of their nightmares."}
    poster_path {"/59b4PaPaI52LJJRNRtG3ALyUvJU.jpg"}
    release_date { Date.today + 1.days}
    mdb_id {639798}
    vote_count {2000}
    factory :release2 do
      name {"Underwater"}
      overview {"After an earthquake destroys their underwater station, six researchers must navigate two miles along the dangerous, unknown depths of the ocean floor to make it to safety in a race against time."}
      poster_path {"/ww7eC3BqSbFsyE5H5qMde8WkxJ2.jpg"}
      release_date {Date.today + 7.days}
      vote_count {1079}
      mdb_id {443791}
    end
    factory :release3 do
      name {"Emma."}
      overview {"In 1800s England, a well-meaning but selfish young woman meddles in the love lives of her friends."}
      poster_path {"/5GbkL9DDRzq3A21nR7Gkv6cFGjq.jpg"}
      release_date {Date.today + 7.days}
      vote_count {256}
      mdb_id {556678}
    end
    factory :release4 do
      name {"Broil"}
      overview {"Broil follows a dysfunctional family of demons vying to control the future of their wealth."}
      poster_path {"/qK6xEaXhawKlVmQwtMO7wtdiU6Z.jpg"}
      release_date {Date.today.next_month}
      vote_count {0}
      mdb_id {669770}
    end
    factory :release5 do
      name {"La belle époque"}
      overview {"Victor, a disillusioned sexagenarian, sees his life turned upside down on the day when Antoine, a brilliant entrepreneur, offers him a new kind of attraction: mixing theatrical artifices and historical reconstruction, this company offers his clients a chance to dive back into the era of their choice. Victor then chose to relive the most memorable week of his life: the one where, 40 years earlier, he met the great love."}
      poster_path {"/zofCXkSIruI8PsTWKiONIa2RI57.jpg"}
      release_date {Date.today.next_month}
      vote_count {315}
      mdb_id {595975}
    end
  end
end