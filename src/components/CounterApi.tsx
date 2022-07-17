import { FormEvent, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useGetCounterValueQuery, useSetCounterMutation } from '@/redux/apis';
import styles from '@/styles/Home.module.css';

function CounterApi() {
  useGetCounterValueQuery();
  const counterApi = useAppSelector((state) => state.counterFromServer);
  const [setCounter] = useSetCounterMutation();
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCounter({ value: +value });
  };

  const handleDecrement = () => {
    setCounter({ value: counterApi.value - 1 });
  };

  const handleIncrement = () => {
    setCounter({ value: counterApi.value + 1 });
  };

  return (
    <>
      <h2>Counter (From Server)</h2>
      <div className={styles.counter}>
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        {counterApi.value}
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.counter}>
        <input value={value} type="number" onChange={(e) => setValue(e.target.value)} />
        <button type="submit">{value ? 'Submit' : 'Reset'}</button>
      </form>
      {!counterApi.loading && counterApi.error && <div>{counterApi.error}</div>}
    </>
  );
}

export default CounterApi;
