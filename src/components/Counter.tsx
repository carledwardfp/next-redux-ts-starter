import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { decrementCounter, incrementCounter, setCounter } from '@/redux/actions';
import styles from '@/styles/Home.module.css';

function Counter() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter);
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setCounter(+value));
  };

  const handleDecrement = () => {
    dispatch(decrementCounter());
  };

  const handleIncrement = () => {
    dispatch(incrementCounter());
  };

  return (
    <>
      <h2>Counter (Client)</h2>
      <div className={styles.counter}>
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        {counter}
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.counter}>
        <input value={value} type="number" onChange={(e) => setValue(e.target.value)} />
        <button type="submit">{value ? 'Submit' : 'Reset'}</button>
      </form>
    </>
  );
}

export default Counter;
