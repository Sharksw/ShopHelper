import { createSelector } from "reselect";
import { List, Map, Record, isCollection } from "immutable";

import { getCurrentDate } from "./mainSelectors";
import { getRouteId } from "./navSelectors";
import { currencies } from "../constants/options";

const getShoppingState = store => store.shopingReducer;

export const getDatesShops = createSelector(getShoppingState, shops => {
  const shopsList = shops.get("dates", Map());
  return shopsList;
});

export const getShopList = createSelector(
  [getDatesShops, getCurrentDate],
  (shops, date) => {
    const shopsList = shops.get(date, List());
    return shopsList;
  }
);

export const getId = (store, ownProps) => ownProps.navigation.getParam("id");

export const getShopsPurchases = createSelector([getShoppingState], shops =>
  shops.get("shops", Map())
);

export const getPurchases = () =>
  createSelector([getShopsPurchases, getId], (shops, id) =>
    shops.get(id, List())
  );

export const getCurrentShop = createSelector(
  [getShopsPurchases, getId],
  (shops, id) => (id ? shops.get(id, new Record()) : new Record())
);

export const getShopQuantity = createSelector(
  getCurrentShop,
  shop =>
    isCollection(shop)
      ? shop.reduce((acc, item) => item.get("quantity") + acc, 0)
      : 0
);

export const getShopAmount = createSelector(
  [getShopList, getId],
  (shopList, id) => {
    const shop = shopList.find(item => item.id === id);
    return shop ? shop.get("totalAmount") : 0;
  }
);

export const getHeaderShop = createSelector(
  [getShopList, getRouteId],
  (shops, id) => shops.find(item => item.id === id)
);

const currencyObject = currencies.reduce(
  (acc, { value }) => acc.set(value, 0),
  new Map()
);

export const getDailyAmount = createSelector(getShopList, shopList =>
  shopList
    .reduce(
      (acc, item) =>
        acc.set(item.currency, acc.get(item.currency) + item.totalAmount),
      currencyObject
    )
    .map((value, key) => `${value} ${key}`)
    .join("/")
);
