import { createAction } from "redux-actions";

export const changeSetting = createAction("CHANGE_SETTING", payload => payload);

export const changeDateRemoving = createAction(
  "CHANGE_DATE_REMOVING",
  payload => payload
);
