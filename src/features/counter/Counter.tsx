import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/common/hooks/useRedux';
import { decrementCounter, incrementCounter, setCounter } from './counterSlice';
import styles from './counter.module.css';

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
    <div className={styles.counters}>
      <h2>Counter (with createSlice)</h2>
      <div className={styles.counter}>
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        {counter}
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input value={value} type="number" onChange={(e) => setValue(e.target.value)} />
        <button type="submit">{value ? 'Set' : 'Reset'}</button>
      </form>
    </div>
  );
}

export default Counter;
