-- PostgreSQL-oriented fixture: schema, types, constraints, CTEs, functions, and DML.
CREATE TYPE public.review_state AS ENUM ('draft', 'published');

CREATE TABLE public.reviews (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    score numeric(3, 1) CHECK (score BETWEEN 0 AND 10),
    state public.review_state DEFAULT 'draft',
    tags text[] NOT NULL DEFAULT '{}',
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX reviews_title_idx ON public.reviews USING gin (to_tsvector('english', title));

WITH ranked AS (
    SELECT id, title, score, row_number() OVER (ORDER BY score DESC) AS rank
    FROM public.reviews
    WHERE state = 'published' AND score IS NOT NULL
)
SELECT * FROM ranked WHERE rank <= 10;

INSERT INTO public.reviews (title, score, state)
VALUES ('Night Walk', 8.5, 'published')
ON CONFLICT (id) DO UPDATE SET score = EXCLUDED.score
RETURNING id;
