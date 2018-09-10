/* @flow */
import { createAction, createActions } from "redux-actions";

export const changeMainName = createAction(
  "CHANGE_MAIN_NAME",
  payload => payload
);

export const { changeDate } = createActions({
  changeDate: {
    INCREASE: payload => payload,
    DECREASE: payload => payload,
    setCurrent: payload => payload
  }
});

export const openDatePicker = createAction("OPEN_DATE_PICKER");

export const switchLoading = createAction("SWITCH_LOADING", payload => payload);
