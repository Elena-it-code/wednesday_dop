import React, {ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState} from 'react';

const CONTAINER_STYLES = {display: 'flex', flexDirection: 'column', gap: 10};

type PropsType = { value?: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void };

// Task 1
// If change value on input Title component not re-render
// If change value on input Task_1 component not re-render



// ***      Решение этой Task(и) 1 способ      ***
// перенесли локальное изменение input из род. компоненты Task в инпут,
// Для того чтобы компонент Task_1 не перерисовывался при изменении значения в инпуте, нам нужно перенести из
// род.компоненты Task локальное управление состоянием input(а), в компонент Input.
// теперь при изменении input, род компоннета не будет перерисовываться и как следствие компонета Title тоже не будет
// перерисовываться.

export const Task_1 = () => {
  /*const [value, setValue] = useState('');  // перенесли локальное управление состоянием input(а), в компонент Input.
  const onChangeHandler = ((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  });*/
  return (
      <div style={{...CONTAINER_STYLES} as any}>
        {/*<Input value={value} onChange={handleChange}/>*/}
        <Input />
        <Title title="I am a title"/>
      </div>
  );
};

const Title = (props: { title: string }) => <h3>{props.title}</h3>;

const Input: FC<PropsType> = ({}) => {

  const [value, setValue] = useState('');

  const onChangeHandler = ((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  });

  return (
      <input type="text" placeholder="Placeholder" value={value} onChange={onChangeHandler}/>
  );
};







// ***      Решение этой Task(и) 2 способ      ***
// `Task_1` и `Title` не влияет на перерисовки, потому что они не зависят от состояния, которое изменяется в инпуте.
// Мемоизация `Task_1` и `Title` здесь не нужна для решения задачи, так как они не перерисовываются при изменении
// значения в инпуте.
//
// Основная задача — избежать перерисовки `Task_1` при изменении значения в инпуте.
// Для этого достаточно мемоизировать `Input`, чтобы он не вызывал перерисовку `Task_1` при изменении значения в инпуте.
// Input мемоизировали с помощью React.memo и переименовали в MemoizedInput, чтобы избежать конфликта имен.
// Таким образом, мемоизация `Input` (теперь `MemoizedInput`) гарантирует, что `Task_1` не будет перерисовываться
// при изменении значения в инпуте.

/*
type PropsType = { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void };

export const Task_1 = () => {
    const [value, setValue] = useState('');

    const handleChange = ((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    });

    return (
        <div style={{...CONTAINER_STYLES} as any}>
            <MemoizedInput value={value} onChange={handleChange}/>
            <Title title="I am a title"/>
        </div>
    );
};

const Title = memo((props: { title: string }) => <h3>{props.title}</h3>);

const Input: FC<PropsType> = ({value, onChange}) => {
    return (
        <input type="text" placeholder="Placeholder" value={value} onChange={onChange}/>
    );
};
const MemoizedInput = React.memo(Input);
*/

