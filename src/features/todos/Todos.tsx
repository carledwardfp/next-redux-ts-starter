import { FormEvent, useState } from 'react';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from './todosApi';
import styles from './todos.module.css';

function Todos() {
  const { data, isError, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const maxId = Math.max(...(data?.map((todo) => todo.id) || []));
    addTodo({ id: maxId + 1, title: value, completed: false })
      .unwrap()
      .then(() => setValue(''));
  };

  return (
    <div className={styles.todosContainer}>
      <h2>Todos (with createApi)</h2>
      {isLoading && <p>Loading...</p>}
      <div className={styles.todos}>
        {data &&
          data.length > 0 &&
          data.map((todo) => (
            <div key={todo.id}>
              <label htmlFor={todo.id.toString()} className={styles.todo}>
                <input
                  id={todo.id.toString()}
                  name={todo.id.toString()}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                />
                <p>{todo.title}</p>
                <svg
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ marginLeft: 8, width: 14, cursor: 'pointer' }}
                  strokeWidth={2}
                  onClick={() => deleteTodo(todo.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </label>
            </div>
          ))}
        {(!data || !data.length) && !isLoading && <p>No todos yet...</p>}
      </div>
      <form onSubmit={handleSubmit} className={styles.counter}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit" disabled={!value}>
          Add Todo
        </button>
      </form>
      {isError && <p>Something went wrong</p>}
    </div>
  );
}

export default Todos;
