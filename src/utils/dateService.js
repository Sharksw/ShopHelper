import moment from "moment";

import { timeModel } from "../constants";

export const getUtcTime = time =>
  moment
    .utc(time)
    .valueOf()
    .toString();

export const incrementDate = time =>
  moment
    .utc(+time)
    .add(1, "d")
    .valueOf();

export const decrementDate = time =>
  moment
    .utc(+time)
    .subtract(1, "d")
    .valueOf();

export const formatDate = time => moment(+time).format(timeModel);
