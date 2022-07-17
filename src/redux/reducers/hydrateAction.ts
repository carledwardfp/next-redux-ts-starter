import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const hydrateAction = createAction<any>(HYDRATE);

export default hydrateAction;
