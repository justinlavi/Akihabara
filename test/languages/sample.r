# R fixture: functions, named arguments, vectors, data frames, pipes, and formulas.
reviews <- data.frame(
    id = c(1L, 2L, 3L),
    title = c("Night Walk", "Neon Rain", "Last Train"),
    score = c(8.5, NA_real_, 7.2),
    published = c(TRUE, FALSE, TRUE)
)

summarize <- function(data, limit = 10L) {
    stopifnot(is.data.frame(data), limit > 0)
    subset(data, published & !is.na(score)) |>
        transform(label = sprintf("%s: %.1f", title, score)) |>
        head(n = limit)
}

result <- tryCatch(
    summarize(reviews, limit = 2L),
    error = function(condition) message(condition$message)
)

model <- lm(score ~ id, data = reviews, na.action = na.omit)
print(result)
print(coef(model))
