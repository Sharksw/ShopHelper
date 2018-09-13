/* @flow  */
import { handleActions } from "redux-actions";
import { Record } from "immutable";
import type { RecordFactory, RecordOf } from "immutable";
import RNLanguages from "react-native-languages";

import type { Payload } from "../types";
import * as settingActions from "../actions/settingActions";

import { getUtcTime } from "../utils/dateService";

type state = {
  currency: string,
  locale: string,
  reportName: string,
  email: string,
  dateRemoving: string
};

export const SettingsInitialState: RecordFactory<state> = Record(
  {
    currency: "UAH",
    locale: RNLanguages.language,
    reportName: "",
    email: "",
    removingDate: getUtcTime()
  },
  "settingsReducerState"
);

// const setLocale = language => {
//   RNLanguages.language = language;
//   i18n.locale = language;
// };

const changeSetting = (
  state,
  { payload }: Payload<{ name: string, value: string }>
): RecordOf<{ name: string, value: string }> =>
  // if (payload.name === "locale") {
  //   setLocale(payload.value);
  // }
  state.set(payload.name, payload.value);

const handleSetCurrent = (
  state,
  { payload }: Payload<string>
): RecordOf<state> => state.set("removingDate", getUtcTime(payload));

export default handleActions(
  {
    [settingActions.changeSetting]: changeSetting,
    [settingActions.changeDateRemoving]: handleSetCurrent
  },
  new SettingsInitialState()
);
