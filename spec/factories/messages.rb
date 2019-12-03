FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtpyuWsUCgdTbtstsEALTt2vvYGOWj5RbZUjmSDcvkSju-i4pl")}
    user
    group
  end
end