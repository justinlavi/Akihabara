package fixtures;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public final class Sample {
    private static final int DEFAULT_LIMIT = 10;

    public enum State { DRAFT, PUBLISHED }
    public record Review(long id, String title, Optional<Double> score, State state) {}
    public sealed interface Result<T> permits Success, Failure {}
    public record Success<T>(T value) implements Result<T> {}
    public record Failure<T>(String message) implements Result<T> {}

    public static List<String> summarize(List<Review> reviews, int limit) {
        return reviews.stream()
            .filter(review -> review.state() == State.PUBLISHED)
            .sorted((left, right) -> Double.compare(
                right.score().orElse(0.0), left.score().orElse(0.0)))
            .limit(limit)
            .map(review -> "%s: %.1f".formatted(review.title(), review.score().orElse(0.0)))
            .toList();
    }

    public static void main(String[] args) {
        var review = new Review(1L, "Night Walk", Optional.of(8.5), State.PUBLISHED);
        System.out.println(summarize(List.of(review), DEFAULT_LIMIT));
    }
}
