/* @flow  */
import { handleActions } from "redux-actions";
import { Record } from "immutable";
import type { RecordFactory, RecordOf } from "immutable";

import type { Payload } from "../types";
import * as mainActions from "../actions/mainActions";
import { getUtcTime, incrementDate, decrementDate } from "../utils/dateService";

type state = {
  name: string,
  currentDate: string,
  isDatePickerOpen: boolean,
  isLoading: boolean
};

export const MainInitialState: RecordFactory<state> = Record(
  {
    name: "vadJs",
    currentDate: getUtcTime(),
    isDatePickerOpen: false,
    isLoading: false
  },
  "mainReducerState"
);

const handleOpenDatePicker = (state): RecordOf<state> =>
  state.set("isDatePickerOpen", true);

const handleSwitchLoading = (
  state,
  { payload }: Payload<boolean>
): RecordOf<state> => state.set("isLoading", payload);

const handleIncreaseDate = (state): RecordOf<state> => {
  const currTime = state.get("currentDate");

  return state.set("currentDate", incrementDate(currTime));
};

const handleDecreaseDate = (state): RecordOf<state> => {
  const currTime = state.get("currentDate");

  return state.set("currentDate", decrementDate(currTime));
};

const handleChangeMainName = (
  state,
  { payload }: Payload<string>
): RecordOf<state> => state.set("name", payload);

const handleSetCurrent = (
  state,
  { payload }: Payload<string>
): RecordOf<state> => state.set("currentDate", getUtcTime(payload));

export default handleActions(
  {
    [mainActions.changeDate.increase]: handleIncreaseDate,
    [mainActions.changeDate.decrease]: handleDecreaseDate,
    [mainActions.changeDate.setCurrent]: handleSetCurrent,
    [mainActions.changeMainName]: handleChangeMainName,
    [mainActions.openDatePicker]: handleOpenDatePicker,
    [mainActions.switchLoading]: handleSwitchLoading
  },
  new MainInitialState()
);
