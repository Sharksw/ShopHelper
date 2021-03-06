/* @flow */
import { createAction } from "redux-actions";
import { NavigationActions } from "react-navigation";
import uuid from "uuid";
import type { Dispatch } from "redux";

import { getUtcTime } from "../utils/dateService";

export const addShop = createAction("ADD_SHOP", payload => payload);
export const copyShop = createAction("COPY_SHOP", payload => payload);
export const updateShop = createAction("UPDATE_SHOP", payload => payload);
export const deleteShop = createAction("DELETE_SHOP", payload => payload);
export const changeShopDateCreated = createAction(
  "CHANGE_SHOP_DATE_CREATED",
  payload => payload
);

export const createPurchase = createAction("ADD_PURCHASE", payload => payload);
export const updatePurchase = createAction(
  "UPDATE_PURCHASE",
  payload => payload
);
export const deletePurchase = createAction(
  "DELETE_PURCHASE",
  payload => payload
);

export const removeTillDate = createAction("REMOVE_DATE", payload => payload);

export const createShop = () => (dispatch: Dispatch, getState: Function) => {
  const { mainReducer, settingReducer } = getState();
  const date = mainReducer.get("currentDate");
  const currency = settingReducer.get("currency");
  const id = uuid();

  dispatch(
    NavigationActions.navigate({
      routeName: "PurchasesScreen",
      params: {
        id
      }
    })
  );

  dispatch(addShop({ date, id, currency }));
};

export const createCopyShop = id => (
  dispatch: Dispatch,
  getState: Function
) => {
  const { mainReducer, shopingReducer } = getState();
  const date = mainReducer.get("currentDate");
  const newId = uuid();

  const copyToShops = shopingReducer.getIn(["shops", id]);
  let copyToDates = shopingReducer
    .getIn(["dates", date])
    .filter(x => x.id === id)
    .get(0)
    .set("id", newId);
  copyToDates = copyToDates.set("name", `${copyToDates.get(["name"])}(copy)`);

  dispatch(copyShop({ id: newId, date, copyToShops, copyToDates }));
};

export const changeShopDateCreatedHandler = (date, shopId) => (
  dispatch: Dispatch,
  getState: Function
) => {
  const { mainReducer } = getState();

  const oldDate = mainReducer.get("currentDate");
  const newDate = getUtcTime(date);

  dispatch(changeShopDateCreated({ oldDate, newDate, shopId }));
};
