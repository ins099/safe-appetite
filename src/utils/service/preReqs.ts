import {utility} from '../utility';

export const preReqs = (...args: any[]) => {
  // let [toast, dispatcher] = args;
  let [toast] = args;
  utility.showToast = toast();
  // utility.dispatch = dispatcher();
};
