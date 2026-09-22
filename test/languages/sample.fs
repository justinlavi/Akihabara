namespace Akihabara.Fixtures

open System

type ReviewState =
    | Draft
    | Published of publishedAt: DateTimeOffset

type Review = {
    Id: Guid
    Title: string
    Score: float option
    State: ReviewState
}

module Reviews =
    let private describeScore score =
        match score with
        | Some value when value >= 8.0 -> $"recommended ({value:F1})"
        | Some value -> $"rated {value:F1}"
        | None -> "unrated"

    let summarize reviews =
        reviews
        |> Seq.filter (fun review -> match review.State with Published _ -> true | Draft -> false)
        |> Seq.map (fun review -> review.Title, describeScore review.Score)
        |> Map.ofSeq
