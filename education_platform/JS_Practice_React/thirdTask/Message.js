export function Message({ inputValue }) {
    return (<div>
        {inputValue > 0 && inputValue !== 0 && <h4>Число больше нуля</h4>}
        {inputValue < 0 && inputValue !== 0 && <h4>Число меньше нуля</h4>}
    </div>);
}