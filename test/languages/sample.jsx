import React from "react";

export const Badge = ({ children, tone = "info", ...attributes }) => (
    <span className={`badge badge--${tone}`} aria-label={tone} {...attributes}>
        {children ?? <em>Empty</em>}
    </span>
);

export function BadgeList({ values, onRemove }) {
    return (
        <ul>
            {values.map((value, index) => (
                <li key={value.id} data-index={index}>
                    <Badge tone={value.active ? "success" : "muted"}>{value.label}</Badge>
                    <button onClick={() => onRemove(value.id)}>Remove</button>
                </li>
            ))}
        </ul>
    );
}
