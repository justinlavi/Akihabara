import 'dart:async';

enum ReviewState { draft, published }

sealed class Result<T> {
  const Result();
}

final class Success<T> extends Result<T> {
  const Success(this.value);
  final T value;
}

typedef Review = ({int id, String title, double? score});

Future<String> summarize(Review review) async {
  await Future<void>.delayed(Duration.zero);
  final (:id, :title, :score) = review;
  return switch (score) {
    null => '$id: $title is unrated',
    >= 8 => '$id: $title is recommended',
    _ => '$id: $title scored ${score.toStringAsFixed(1)}',
  };
}

void main() async => print(await summarize((id: 1, title: 'Night Walk', score: 8.5)));
