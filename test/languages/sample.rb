# frozen_string_literal: true

module Akihabara
  Review = Data.define(:id, :title, :score, :state) do
    def published? = state == :published

    def summary
      formatted = score ? format('%.1f', score) : 'unrated'
      "#{title}: #{formatted}"
    end
  end

  class Catalog
    DEFAULT_LIMIT = 10

    def initialize(reviews)
      @reviews = reviews.freeze
    end

    def summaries(limit: DEFAULT_LIMIT)
      @reviews
        .select(&:published?)
        .sort_by { |review| -(review.score || 0) }
        .first(limit)
        .map(&:summary)
    rescue ArgumentError => error
      warn error.message
      []
    end
  end
end

puts Akihabara::Catalog.new([Akihabara::Review.new(1, 'Night Walk', 8.5, :published)]).summaries
