/* @flow  */
import { handleActions } from "redux-actions";
import { Record } from "immutable";
import type { RecordFactory, RecordOf } from "immutable";
import moment from "moment";
import type { Payload } from "../types";
import * as mainActions from "../actions/mainActions";
import { timeModel } from "../constants";

type state = {
  name: string,
  currentDate: string,
  isDatePickerOpen: boolean
};

export const MainInitialState: RecordFactory<state> = Record(
  {
    name: "vadJs",
    currentDate: moment.utc().valueOf(),
    isDatePickerOpen: false
  },
  "mainReducerState"
);

const handleOpenDatePicker = (state): RecordOf<state> =>
  state.set("isDatePickerOpen", true);

const handleIncreaseDate = (state): RecordOf<state> => {
  const currTime = state.get("currentDate");

  return state.set(
    "currentDate",
    moment
      .utc(currTime)
      .add(1, "d")
      .valueOf()
  );
};

const handleDecreaseDate = (state): RecordOf<state> => {
  const currTime = state.get("currentDate");

  return state.set(
    "currentDate",
    // moment(currTime, timeModel)
    moment
      .utc(currTime)
      .subtract(1, "d")
      .valueOf()
  );
};

const handleChangeMainName = (
  state,
  { payload }: Payload<string>
): RecordOf<state> => state.set("name", payload);

const handleSetCurrent = (
  state,
  { payload }: Payload<string>
): RecordOf<state> =>
  state.set("currentDate", moment(payload).format(timeModel));

export default handleActions(
  {
    [mainActions.changeDate.increase]: handleIncreaseDate,
    [mainActions.changeDate.decrease]: handleDecreaseDate,
    [mainActions.changeDate.setCurrent]: handleSetCurrent,
    [mainActions.changeMainName]: handleChangeMainName,
    [mainActions.openDatePicker]: handleOpenDatePicker
  },
  new MainInitialState()
);
