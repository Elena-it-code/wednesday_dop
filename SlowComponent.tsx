import {memo, useCallback} from "react";

// Start data:
/*export const SlowComponent = () => {
  console.log('SlowComponent re-render...');

  let now = performance.now();

  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 100ms
  }

  return <p>I am a very slow component tree.</p>;
};*/







// *** -------- ***
// ***      Решение этой Task(и) 2 способ      ***
// обернули дочерний компонент SlowComponent в HOC memo()
// Теперь React будет использовать мемоизированную версию компонента и перерисовывать его только в том случае, если его
// пропсы изменились. Т.к. в нашей задаче компонента изменяется, не получает пропсы на входе, то как следсвие
// она не будет перерисовываться при введении значения в input
/*export const SlowComponent = memo (() => {
  console.log('SlowComponent re-render...');

  let now = performance.now();

  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 100ms
  }

  return <p>I am a very slow component tree.</p>;
});*/
// *** -------- ***







// *** -------- ***
// ***      Решение этой Task(и) 3 способ      ***
export const SlowComponent = () => {
  console.log('SlowComponent re-render...');

  let now = performance.now();

  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 100ms
  }

  return <p>I am a very slow component tree.</p>;
};
// *** -------- ***
