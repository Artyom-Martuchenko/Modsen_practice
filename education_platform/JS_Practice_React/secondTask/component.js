export function Component ({ text, mode }) {
    return <h3>{mode === "Подробнее" ? text.slice(0, text.indexOf('.') + 1) : text}</h3>
}