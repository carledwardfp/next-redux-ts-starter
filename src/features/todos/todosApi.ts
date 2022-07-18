import baseApi from '@/app/baseApi';
import type { Todo } from './todosTypes';

export const todosApi = baseApi
  .enhanceEndpoints({
    // Important if you want to implement revalidation.
    // You can also specify this tagType on baseApi.ts if
    // you want to revalidate 'todos' from other apis
    addTagTypes: ['Todos', 'Todo'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      getTodos: builder.query<Todo[], void>({
        providesTags: ['Todos'],
        query: () => ({
          url: '/todos',
        }),
      }),
      getTodo: builder.query<Todo, number>({
        providesTags: (res) => (res ? [{ type: 'Todo', id: res.id }] : ['Todo']),
        query: (todoId) => ({
          url: `/todos/${todoId}`,
        }),
      }),
      addTodo: builder.mutation<Todo, Todo>({
        invalidatesTags: ['Todos'],
        query: (todo) => ({
          method: 'POST',
          url: '/todos',
          body: todo,
        }),
      }),
      updateTodo: builder.mutation<Todo, Todo>({
        invalidatesTags: (res) =>
          res ? [{ type: 'Todo', id: res.id }, 'Todos'] : ['Todo', 'Todos'],
        query: (todo) => ({
          method: 'PUT',
          url: `/todos/${todo.id}`,
          body: todo,
        }),
      }),
      deleteTodo: builder.mutation<{}, number>({
        invalidatesTags: ['Todos'],
        query: (todoId) => ({
          method: 'DELETE',
          url: `/todos/${todoId}`,
        }),
      }),
    }),
  });

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
