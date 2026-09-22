local DEFAULT_LIMIT <const> = 10

---@class Review
---@field id integer
---@field title string
---@field score number?
local Review = {}
Review.__index = Review

function Review.new(id, title, score)
    return setmetatable({ id = id, title = title, score = score }, Review)
end

function Review:summary()
    local score = self.score and string.format("%.1f", self.score) or "unrated"
    return string.format("%d: %s (%s)", self.id, self.title, score)
end

local reviews = { Review.new(1, "Night Walk", 8.5) }
for index, review in ipairs(reviews) do
    if index <= DEFAULT_LIMIT then
        print(review:summary())
    end
end
