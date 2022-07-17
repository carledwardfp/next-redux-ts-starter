# NextJs-Typescript-ReduxToolkit-RTKQuery Starter

A NextJs Starter with Redux (Redux Toolkit and RTK Query) written in Typescript.

### Features

- ⚡️ Next 12, React 18
- ✔️ Typescript
- 🧠 Redux Toolkit (with next-redux-wrapper)
- 🌐 RTK Query

### Coding Style

- ★ ESLint
- 💅 Prettier

## Getting Started

### Installing

```sh
yarn create next-app [project-name] -e https://github.com/official-carledwardfp/next-redux-ts-starter
# or
npx create-next-app [project-name] -e https://github.com/official-carledwardfp/next-redux-ts-starter
```

### Executing program

- Run `yarn serve:mock` or `npx run serve:mock` to run the mock database
- Run `yarn dev` or `npm run dev` to start developing

## Help

The current version adds extraReducers to every reducer file. If you know a way to make it global in `store.ts`, please add a Pull Request.

```tsx
// hydrateAction.ts
import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const hydrateAction = createAction<any>(HYDRATE);

export default hydrateAction;

// reducer
{
  ...
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (_state, action) => {
      return action.payload.counter;
    });
  },
}
```

## Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.

Contributors:

- Author - Carl Edward [@carledwardfp](https://github.com/official-carledwardfp)

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/official-carledwardfp/next-redux-ts-starter/blob/develop/LICENSE) file for details
