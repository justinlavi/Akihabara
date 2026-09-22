module AkihabaraFixture

export Review, summarize

@enum ReviewState draft published

struct Review{T<:Real}
    id::Int
    title::String
    score::Union{T,Nothing}
    state::ReviewState
end

function summarize(reviews::AbstractVector{<:Review}; limit::Integer=10)
    published_reviews = filter(review -> review.state == published, reviews)
    sorted = sort(published_reviews; by=review -> something(review.score, 0), rev=true)
    return ["$(review.title): $(round(something(review.score, 0); digits=1))"
            for review in Iterators.take(sorted, limit)]
end

macro fixture(expression)
    return :(println($(esc(expression))))
end

@fixture summarize([Review(1, "Night Walk", 8.5, published)])

end
