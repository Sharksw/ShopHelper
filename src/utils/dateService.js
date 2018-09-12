import moment from "moment";

import { timeModel } from "../constants";

// Should bew value string because redux-persist rehydrate keys to string

export const getUtcTime = time =>
  moment
    .utc(time)
    .startOf("day")
    .valueOf()
    .toString();

export const incrementDate = time =>
  moment
    .utc(+time)
    .add(1, "d")
    .valueOf()
    .toString();

export const decrementDate = time =>
  moment
    .utc(+time)
    .subtract(1, "d")
    .valueOf()
    .toString();

export const formatDate = time => moment(+time).format(timeModel);
