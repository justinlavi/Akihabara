import React, { useMemo, useState } from "react";

type CardProps = {
    title: string;
    score?: number;
    onSelect(id: string): void;
};

export function ScoreCard({ title, score = 0, onSelect }: CardProps) {
    const [active, setActive] = useState(false);
    const label = useMemo(() => `${title}: ${score.toFixed(1)}`, [title, score]);

    return (
        <article className={active ? "card card--active" : "card"} data-score={score}>
            <h2>{label}</h2>
            {score > 8 ? <strong>Recommended</strong> : null}
            <button onClick={() => { setActive(!active); onSelect(title); }}>
                {active ? "Selected" : "Select"}
            </button>
        </article>
    );
}
