// @flow
import React from "react";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import { View, Text } from "react-native";

type Props = {
  currDate: string,
  setCurrent: Function,
  viewStyle: Object,
  dateStyle: Object
};

const Date = (props: Props) => (
  <View style={props.viewStyle}>
    <Text style={props.dateStyle}>{props.currDate}</Text>
    <DatePicker
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      date={moment(props.currDate)
        .utc()
        .valueOf()
        .toString()}
      onDateChange={props.setCurrent}
      hideText
    />
  </View>
);
export default Date;
