package fixtures

enum class ReviewState { DRAFT, PUBLISHED }

@JvmInline
value class ReviewId(val value: Long)

data class Review(
    val id: ReviewId,
    val title: String,
    val score: Double? = null,
    val state: ReviewState = ReviewState.DRAFT,
)

sealed interface Result<out T> {
    data class Success<T>(val value: T) : Result<T>
    data class Failure(val message: String) : Result<Nothing>
}

fun List<Review>.summaries(limit: Int = 10): List<String> =
    asSequence()
        .filter { it.state == ReviewState.PUBLISHED }
        .sortedByDescending { it.score ?: 0.0 }
        .take(limit)
        .map { review -> "${review.title}: ${review.score?.let { "%.1f".format(it) } ?: "unrated"}" }
        .toList()

fun main() = println(listOf(Review(ReviewId(1), "Night Walk", 8.5)).summaries())
