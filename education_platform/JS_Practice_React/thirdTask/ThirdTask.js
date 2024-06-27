// Задание 3 вариант 2:
// Необходимо реализовать функциональный
// компонент InputNumber, в котором нужно
// ввести число в input и в зависимости
// отрицательное или положительное это число
// в компоненте Message нужно выводить
// информацию: ”Число больше нуля” / “Число
// меньше нуля”.

import { useState } from 'react';
import { InputNumber } from './InputNumber';
import { Message } from './Message';

export function ThirdTask(){
    const [inputValue, setInputValue] = useState(0)

    const InputHandler = (value) =>{
        setInputValue(value.target.value)
    }

    return <div>
        <InputNumber InputHandler={InputHandler}/>
        <Message inputValue={inputValue}/>
    </div>
}