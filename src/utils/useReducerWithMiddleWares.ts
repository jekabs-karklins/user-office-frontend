import {
  useState,
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction,
} from 'react';

function compose(...fns: any): any {
  if (fns.length === 0) return (arg: any): any => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce((a: any, b: any) => (...args: any): any => a(b(...args)));
}

export function useReducerWithMiddleWares<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  middlewares: Array<Function> = []
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const hook = useState(initialState);
  let state = hook[0];
  const setState = hook[1];
  const dispatch = (action: any): ReducerAction<R> => {
    state = reducer(state, action);
    setState(state);

    return action;
  };
  // eslint-disable-next-line prefer-const
  let enhancedDispatch: any;
  const store = {
    getState: (): ReducerState<R> => state,
    dispatch: (...args: any): Dispatch<ReducerAction<R>> =>
      enhancedDispatch(...args),
  };
  const chain = middlewares.map(middleware => middleware(store));
  enhancedDispatch = compose(...chain)(dispatch);

  return [state, enhancedDispatch];
}

export interface MiddlewareInputParams<T, A> {
  getState: () => T;
  dispatch: React.Dispatch<A>;
}
export type ReducerMiddleware<T, A> = (
  params: MiddlewareInputParams<T, A>
) => (next: Function) => (action: A) => void;
