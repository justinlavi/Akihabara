import Foundation

enum ReviewState: String, Codable { case draft, published }

protocol IdentifiableRecord { associatedtype ID: Hashable; var id: ID { get } }

struct Review: IdentifiableRecord, Codable {
    let id: UUID
    var title: String
    var score: Double?
    var state: ReviewState

    var summary: String {
        let value = score.map { String(format: "%.1f", $0) } ?? "unrated"
        return "\(title): \(value)"
    }
}

actor ReviewStore {
    private var reviews: [UUID: Review] = [:]
    subscript(id: UUID) -> Review? { reviews[id] }
    func save(_ review: Review) { reviews[review.id] = review }
}

func published<T: Sequence>(_ values: T) -> [Review] where T.Element == Review {
    values.filter { $0.state == .published }.sorted { ($0.score ?? 0) > ($1.score ?? 0) }
}
