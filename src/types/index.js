/* @flow */
export type Action<P, M> = {
  type: string,
  payload?: P,
  meta?: M
};

export type Payload<T> = {
  payload: T
};

export type ShopItem = {
  id: string,
  name: string,
  totalAmount: number
};
