/* @flow */
import { createAction } from "redux-actions";
import { NavigationActions } from "react-navigation";
import uuid from "uuid";

import type { Dispatch } from "redux";

export const addShop = createAction("ADD_SHOP", payload => payload);
export const updateShop = createAction("UPDATE_SHOP", payload => payload);
export const deleteShop = createAction("DELETE_SHOP", payload => payload);

export const createPurchase = createAction("ADD_PURCHASE", payload => payload);
export const updatePurchase = createAction(
  "UPDATE_PURCHASE",
  payload => payload
);
export const deletePurchase = createAction(
  "DELETE_PURCHASE",
  payload => payload
);

export const removeDate = createAction("REMOVE_DATE", payload => payload);

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
