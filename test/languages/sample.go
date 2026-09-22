package main

import (
	"context"
	"fmt"
	"slices"
)

const defaultLimit = 10

type Review struct {
	ID    int
	Title string
	Score *float64
}

type Repository[T any] interface {
	All(context.Context) ([]T, error)
}

func summarize[T fmt.Stringer](values []T, limit int) []string {
	result := make([]string, 0, min(limit, len(values)))
	for _, value := range values {
		result = append(result, value.String())
	}
	slices.Sort(result)
	return result[:min(limit, len(result))]
}

func main() {
	score := 8.5
	review := Review{ID: 1, Title: "Night Walk", Score: &score}
	fmt.Printf("%s: %.1f\n", review.Title, *review.Score)
}
