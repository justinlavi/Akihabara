using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Akihabara.Fixtures;

public enum ReviewState { Draft, Published }
public readonly record struct ReviewId(Guid Value);
public sealed record Review(ReviewId Id, string Title, double? Score, ReviewState State);

public interface IRepository<out T> { IEnumerable<T> All { get; } }

public sealed class ReviewService(IRepository<Review> repository)
{
    public const int DefaultLimit = 10;
    public event Action<Review>? Selected;

    public async Task<IReadOnlyList<string>> SummariesAsync(int limit = DefaultLimit)
    {
        await Task.Yield();
        return repository.All
            .Where(review => review.State is ReviewState.Published)
            .OrderByDescending(review => review.Score ?? 0)
            .Take(limit)
            .Select(review => $"{review.Title}: {review.Score:F1}")
            .ToArray();
    }

    public void Select(Review review) => Selected?.Invoke(review);
}
