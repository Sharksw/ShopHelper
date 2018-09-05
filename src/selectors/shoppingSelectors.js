import { createSelector } from "reselect";
import { List } from "immutable";

import { getCurrentDate } from "./mainSelectors";
import { getRouteId } from "./navSelectors";

const getShoppingState = store => store.shopingReducer;

export const getDatesShops = createSelector(getShoppingState, shops => {
  const shopsList = shops.get("dates");
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
  shops.get("shops")
);

export const getPurchases = () =>
  createSelector([getShopsPurchases, getId], (shops, id) => shops.get(id));

export const getCurrentShop = createSelector(
  [getShopsPurchases, getId],
  (shops, id) => shops.get(id)
);

export const getShopQuantity = createSelector(
  getCurrentShop,
  shop => (shop ? shop.reduce((acc, item) => item.get("quantity") + acc, 0) : 0)
);

export const getShopAmount = createSelector(
  [getShopList, getId],
  (shopList, id) => shopList.find(item => item.id === id).get("totalAmount")
);

export const getHeaderShop = createSelector(
  [getShopList, getRouteId],
  (shops, id) => shops.find(item => item.id === id)
);

export const getDailyAmount = createSelector(getShopList, shopList =>
  shopList.reduce((acc, item) => acc + item.totalAmount, 0)
);
