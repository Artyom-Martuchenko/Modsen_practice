export function InputNumber({InputHandler}) {
    return (<div>
        <input type="number" onChange={(e) => InputHandler(e)}/>
    </div>);
}