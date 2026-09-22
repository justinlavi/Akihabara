use std::collections::HashMap;
use std::fmt::{self, Display};

const DEFAULT_LIMIT: usize = 10;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum ReviewState { Draft, Published }

#[derive(Debug)]
struct Review<'a> {
    id: u64,
    title: &'a str,
    score: Option<f64>,
    state: ReviewState,
}

impl Display for Review<'_> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(formatter, "{}: {:.1}", self.title, self.score.unwrap_or_default())
    }
}

fn summarize<T: Display>(values: impl IntoIterator<Item = T>, limit: usize) -> Vec<String> {
    values.into_iter().take(limit).map(|value| value.to_string()).collect()
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let review = Review { id: 1, title: "Night Walk", score: Some(8.5), state: ReviewState::Published };
    let mut counts: HashMap<&str, usize> = HashMap::new();
    *counts.entry("published").or_default() += 1;
    println!("{:?} {:?}", summarize([review], DEFAULT_LIMIT), counts);
    Ok(())
}
