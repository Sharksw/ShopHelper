import { createSelector } from "reselect";
import moment from "moment";

import { timeModel } from "../constants";

const getMainState = store => store.mainReducer;

export const getMainName = createSelector(getMainState, main =>
  main.get("name")
);

export const getCurrentDate = createSelector(getMainState, main =>
  main.get("currentDate")
);
export const getCurrentFormattedDate = createSelector(getMainState, main =>
  moment(main.get("currentDate")).format(timeModel)
);

export const getIsDatePickerOpen = createSelector(getMainState, main =>
  main.get("isDatePickerOpen")
);
