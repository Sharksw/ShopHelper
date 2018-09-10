import { createSelector } from "reselect";

import { formatDate } from "../utils/dateService";

const getMainState = store => store.mainReducer;

export const getMainName = createSelector(getMainState, main =>
  main.get("name")
);

export const getCurrentDate = createSelector(getMainState, main =>
  main.get("currentDate")
);
export const getCurrentFormattedDate = createSelector(getMainState, main =>
  formatDate(main.get("currentDate"))
);

export const getIsDatePickerOpen = createSelector(getMainState, main =>
  main.get("isDatePickerOpen")
);
export const getIsLoading = createSelector(getMainState, main =>
  main.get("isLoading")
);
