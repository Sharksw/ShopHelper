/* @flow */
import { handleActions } from "redux-actions";
import { Record, List, Map } from "immutable";
import type { RecordFactory, RecordOf } from "immutable";
import uuid from "uuid";

import type { Payload, ShopItem, PurchaseItem } from "../types";

import * as shoppingActions from "../actions/shoppingActions";

export const DateItem: RecordFactory<ShopItem> = Record(
  {
    id: uuid(),
    name: "Покупка",
    totalAmount: 0
  },
  "shopItem"
);

type dateList = List<DateItem>;

export const PurchaseItemState: RecordFactory<PurchaseItem> = Record(
  {
    id: uuid(),
    name: "Товар",
    price: 0.0,
    quantity: 1.0,
    photo: "",
    barCode: "",
    shopName: "",
    date: 0,
    currency: "USD"
  },
  "purchaseItem"
);

// $FlowFixMe
Object.defineProperty(PurchaseItemState.prototype, "amount", {
  get() {
    if (!this.price) return 0;
    return this.price * this.quantity;
  }
});

type PurchaseList = List<PurchaseItemState>;

type state = {
  dates: Map<string, dateList>,
  shops: Map<string, PurchaseList>
};

export const ShoppingState: RecordFactory<state> = Record(
  {
    dates: Map(),
    shops: Map()
  },
  "shoppingState"
);

const getList = (state, entity: string, id: string) =>
  state.getIn([entity, id], List());

const shopAmount = (updatedList: PurchaseList): number =>
  updatedList.reduce((acc, item) => acc + item.amount, 0);

const updatedListWithTotalAmount = ({ state, updatedList, date, shopId }) => {
  const dateList = state.getIn(["dates", date], List());
  const totalAmount = shopAmount(updatedList);

  return dateList.update(dateList.findIndex(item => item.id === shopId), item =>
    item.set("totalAmount", totalAmount)
  );
};

const addShop = (
  state,
  { payload }: Payload<{ id: string, date: string }>
): RecordOf<state> => {
  const { date, id } = payload;
  const list = state.getIn(["dates", date], List());

  const updateList = list.push(
    new DateItem({ id, name: `Покупка ${list.size + 1}` })
  );

  return state.setIn(["dates", date], updateList);
};

const addPurchase = (
  state,
  {
    payload: { id, price, quantity, date }
  }: Payload<{ id: string, price: string, quantity: string, date: string }>
): RecordOf<state> => {
  const purchaseList = getList(state, "shops", id);

  const updatedList = purchaseList.unshift(
    new PurchaseItemState({
      id: uuid(),
      name: `Товар ${purchaseList.size + 1}`,
      price: +price,
      quantity: +quantity,
      date
    })
  );

  const updateDateList = updatedListWithTotalAmount({
    state,
    updatedList,
    date,
    shopId: id
  });

  return state.withMutations(shoppingReducer =>
    shoppingReducer
      .setIn(["shops", id], updatedList)
      .setIn(["dates", date], updateDateList)
  );
};

const deleteShop = (
  state,
  { payload: { id, date } }: Payload<{ date: string, id: string }>
): RecordOf<state> => {
  const shopList = getList(state, "dates", date);
  const updatedList = shopList.filter(item => item.id !== id);

  return state.setIn(["dates", date], updatedList);
};
const deletePurchase = (
  state,
  {
    payload: { id, shopId, date }
  }: Payload<{ shopId: string, id: string, date: string }>
): RecordOf<state> => {
  const shopList = getList(state, "shops", shopId);
  const updatedList = shopList.filter(item => item.id !== id);

  const updateDateList = updatedListWithTotalAmount({
    state,
    updatedList,
    date,
    shopId
  });

  return state.withMutations(shoppingReducer =>
    shoppingReducer
      .setIn(["shops", shopId], updatedList)
      .setIn(["dates", date], updateDateList)
  );
};

const updateShop = (
  state,
  {
    payload: { date, id, param, value }
  }: Payload<{
    id: string,
    date: string,
    param: string,
    value: any
  }>
): RecordOf<state> => {
  const list = state.getIn(["dates", date], List());

  const updateList = list.update(list.findIndex(item => item.id === id), item =>
    item.set(param, value)
  );
  return state.setIn(["dates", date], updateList);
};

const updatePurchase = (
  state,
  {
    payload: { id, shopId, param, value, date }
  }: Payload<{
    shopId: string,
    id: string,
    param: string,
    value: any,
    date: string
  }>
): RecordOf<state> => {
  const shopList = getList(state, "shops", shopId);
  const updatedList = shopList.update(
    shopList.findIndex(item => item.id === id),
    item => item.set(param, value)
  );

  const updateDateList = updatedListWithTotalAmount({
    state,
    updatedList,
    date,
    shopId
  });

  return state.withMutations(shoppingReducer =>
    shoppingReducer
      .setIn(["shops", shopId], updatedList)
      .setIn(["dates", date], updateDateList)
  );
};

export default handleActions(
  {
    [shoppingActions.addShop]: addShop,
    [shoppingActions.updateShop]: updateShop,
    [shoppingActions.deleteShop]: deleteShop,
    [shoppingActions.createPurchase]: addPurchase,
    [shoppingActions.updatePurchase]: updatePurchase,
    [shoppingActions.deletePurchase]: deletePurchase
  },
  new ShoppingState()
);
