import { createSelector } from "reselect";

import { formatDate } from "../utils/dateService";

export const getSettingState = store => store.settingReducer;

export const getCurrency = createSelector(getSettingState, settings =>
  settings.get("currency")
);

export const getLocale = createSelector(getSettingState, settings =>
  settings.get("locale")
);
export const getReportName = createSelector(getSettingState, settings =>
  settings.get("reportName")
);
export const getEmail = createSelector(getSettingState, settings =>
  settings.get("email")
);
export const getRemovingDate = createSelector(getSettingState, settings =>
  settings.get("removingDate")
);

export const getFormatedRemovingDate = createSelector(
  getSettingState,
  settings => formatDate(settings.get("removingDate"))
);
