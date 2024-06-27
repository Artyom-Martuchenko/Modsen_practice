//Задание 1 Вариант 2:
//Реализовать форму c помощью
//функциональных компонентов, в форме
//должно быть реализовано одно поле и
//значение этого поля нужно выводить в
//консоль после нажатия на кнопку, которая
//находится тоже в форме. Нужно использовать
//хук useRef для того, чтобы вывести значение,
//которое введено в input.

import { createRef } from 'react';

export function FirstTask(){
    const formRef = createRef()
  
    function clickHandler(){
      console.log(formRef.current.value)
    }
    
    return (
      <div>
        <input ref={formRef}/>
        <button type="submit" onClick={()=>clickHandler()}>Search</button>
      </div>
    );
}