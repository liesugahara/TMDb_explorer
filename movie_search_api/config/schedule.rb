# Use this file to easily define all of your cron jobs.

every 1.day do
  runner "Release.get_upcoming_movies"
end
