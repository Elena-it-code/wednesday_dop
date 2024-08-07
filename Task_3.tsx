import React, {ChangeEvent, memo, ReactNode, useState} from 'react';
import { SlowComponent } from './slowComponent/SlowComponent';


//find the problem and fix it as part of composition optimization, memo, children
// Start data:
/*export const Task_3 = () => {
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

  return (
    <div>
      <div>Lags when change value</div>
      <input type="text" value={value} onChange={onChange} />
      <SlowComponent />
    </div>
  );
};*/







// *** -------- ***
// ***      Решение этой Task(и) 1 способ      -- composition optimization --     ***
// Выносим Input в отедельный компмонент, тем самым улучшим производительность и обойдем задержку в 1000ms
// Таким образом локальный стэйт будет храниться в самой компоненте Input, и как следствие род.компонента Task_3, теперь
// не будет перерисовыватьс, а это значит, что она и не потянет за собой перерисовку дочерней компоненты SlowComponent,
// которая вызывает задержку в 1000ms. Её оставляем неизменной.
/*export const Task_3 = () => {

  return (
    <div>
      <div>Lags when change value</div>
      <Input/>
      <SlowComponent />
    </div>
  );
};

const Input = () => {

    const [value, setValue] = useState('');
    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    return (
        <input type="text" value={value} onChange={onChange} />
    )
}*/
// *** -------- ***







// *** -------- ***
// ***      Решение этой Task(и) 2 способ      -- memo --    ***
// обернули дочерний компонент SlowComponent в HOC memo()
// Теперь React будет использовать мемоизированную версию компонента и перерисовывать его только в том случае, если его
// пропсы изменились. Т.к. в нашей задаче компонента изменяется, не получает пропсы на входе, то как следсвие
// она не будет перерисовываться при введении значения в input
/*export const Task_3 = () => {
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

  return (
    <div>
      <div>Lags when change value</div>
      <input type="text" value={value} onChange={onChange} />
      <SlowComponent />
    </div>
  );
};*/
// *** -------- ***







// *** -------- ***
// ***      Решение этой Task(и) 3 способ      -- children --  ***
// После того как мы создали children SlowComponent компонент в Task_3, у нас не будет перерисовки, т.к. props(объект)
// создался. А props не поменяется. Он поменяется только, когда у нас будет перерендерна компонента App().
// Здесь он постоянно будет один и тот же объект, поэтому он не будет ререндерится.

type Props = {
    children: React.ReactNode
}
export const Task_3 = ({children}: Props) => {
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    return (
        <div>
            <div>Lags when change value</div>
            <input type="text" value={value} onChange={onChange} />
            {children}
        </div>
    );
};
// *** -------- ***







/*Использование `children` в React позволяет создавать более гибкие и переиспользуемые компоненты. `children` —
это специальный проп в React, который позволяет передавать дочерние элементы внутрь компонента. Это мощный паттерн,
который упрощает композицию компонентов и делает их более модульными.

### Алгоритм и логика использования `children`

1. **Определение компонента с `children`**:
   - Компонент, который будет принимать дочерние элементы, должен объявить props `children`.
   - Этот props уже определен в React, и вы можете использовать его напрямую.

2. **Передача дочерних элементов**:
   - При использовании компонента, вы можете передать дочерние элементы внутрь него, просто поместив их между
   открывающим и закрывающим тегами компонента.

3. **Использование `children` внутри компонента**:
   - Внутри компонента вы можете использовать `children` для отображения переданных дочерних элементов.

### Пример

Рассмотрим пример, где у нас есть компонент `Task_3`, который принимает дочерние элементы и отображает их:

```jsx
import React, { useState, ChangeEvent } from 'react';

type Props = {
    children: React.ReactNode;
}

export const Task_3 = ({ children }: Props) => {
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    return (
        <div>
            <div>Lags when change value</div>
            <input type="text" value={value} onChange={onChange} />
            {children}
        </div>
    );
};
```

### Объяснение

1. **Определение компонента с `children`**:
   - Компонент `Task_3` принимает props `children` типа `React.ReactNode`. Этот тип включает в себя все возможные
   дочерние элементы, которые могут быть переданы в React (строки, числа, другие компоненты и т.д.).

2. **Передача дочерних элементов**:
   - При использовании `Task_3`, вы можете передать дочерние элементы внутрь него, например:
     ```jsx
     <Task_3>
         <SlowComponent />
     </Task_3>
     ```
   - В этом примере `SlowComponent` передается как дочерний элемент `Task_3`.

3. **Использование `children` внутри компонента**:
   - Внутри `Task_3` мы используем `children` для отображения переданных дочерних элементов:
     ```jsx
     {children}
     ```
   - Это позволяет `Task_3` отображать любой контент, который передан внутрь него.

### Преимущества использования `children`

- **Гибкость**: Компоненты могут быть более гибкими и переиспользуемыми, так как они могут принимать различные дочерние
элементы.
- **Композиция**: Упрощает композицию компонентов, позволяя создавать сложные интерфейсы из более простых компонентов.
- **Универсальность**: Компоненты, которые используют `children`, могут быть использованы в различных контекстах и
сценариях.

### Заключение

Использование `children` в React — это мощный паттерн, который позволяет создавать более гибкие и переиспользуемые
компоненты. Он упрощает композицию компонентов и делает их более модульными, что облегчает разработку и поддержку кода.*/

