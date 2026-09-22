<?php

declare(strict_types=1);

namespace Akihabara\Fixtures;

enum ReviewState: string
{
    case Draft = 'draft';
    case Published = 'published';
}

readonly class Review
{
    public function __construct(
        public int $id,
        public string $title,
        public ?float $score = null,
        public ReviewState $state = ReviewState::Draft,
    ) {}

    public function summary(): string
    {
        $score = match ($this->score) {
            null => 'unrated',
            default => number_format($this->score, 1),
        };
        return "{$this->title}: {$score}";
    }
}

$reviews = [new Review(1, 'Night Walk', 8.5, ReviewState::Published)];
echo implode(PHP_EOL, array_map(fn (Review $review): string => $review->summary(), $reviews));
