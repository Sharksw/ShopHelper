// @flow
import React, { PureComponent } from "react";
import { View } from "react-native";
import Date from "../../components/Date";

import SettingButton from "../../components/SettingButton";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextBlock from "../../components/TextBlock";

import {
  // languages,
  currencies
} from "../../constants/options";
import i18n from "../../i18n";

import styles from "./styles";

type Props = {
  setCurrent: Function,
  currency: string,
  locale: string,
  reportName: string,
  email: string,
  changeSetting: Function,
  removingDate: string,
  formatedRemovingDate: string,
  changeDateRemoving: Function,
  removeTillDate: Function
};

class Settings extends PureComponent<Props> {
  changeSetting = (name, value) => this.props.changeSetting({ name, value });
  removeDates = () => this.props.removeTillDate(this.props.removingDate);

  render() {
    return (
      <View style={styles.settingContainer}>
        <TextBlock styles={styles.header} bold>
          {i18n.t("settingsPurchases")}
        </TextBlock>
        <Select
          placeholder="Гривны"
          selectedValue={this.props.currency}
          onValueChange={value => this.changeSetting("currency", value)}
          options={currencies}
        />
        {/* <Select
          selectedValue={this.props.locale}
          onValueChange={value => this.changeSetting("locale", value)}
          placeholder="Language"
          options={languages}
        /> */}
        {/* <SettingButton onPress={() => {}} title="Сохранить" /> */}
        <View style={styles.dateContainer}>
          <TextBlock>{i18n.t("settingsDeleteAllDataBefore")} </TextBlock>
          <Date
            currDate={this.props.formatedRemovingDate}
            setCurrent={this.props.changeDateRemoving}
            viewStyle={styles.dateView}
            dateStyle={styles.dateStyle}
          />
        </View>
        <SettingButton title={i18n.t("delete")} onPress={this.removeDates} />
        <TextBlock styles={styles.header} bold>
          {i18n.t("settingsReports")}
        </TextBlock>
        <Input
          placeholder="example@gmail.com"
          value={this.props.email}
          onChangeText={text => this.changeSetting("email", text)}
        />
        <Input
          placeholder={i18n.t("settingsReportOnPurchases")}
          value={this.props.reportName}
          onChangeText={text => this.changeSetting("reportName", text)}
        />
        {/* <SettingButton onPress={() => {}} title="Сохранить" /> */}
      </View>
    );
  }
}

Settings.navigationOptions = {
  title: i18n.t("settingsTitle")
};

export default Settings;
