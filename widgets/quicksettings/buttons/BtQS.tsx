import Bluetooth from "gi://AstalBluetooth";
import QSButton from "../QSButton";
import { App } from "astal/gtk4";
import { execAsync } from "astal/process";
import { bind } from "astal";

export default function BtQS() {
  const bluetooth = Bluetooth.get_default();
  const btdev = bluetooth?.device!;
  return (
    <QSButton
      cssClasses={bind(bluetooth, "is-powered").as((enabled) => {
        const classes = ["qs-button"];
        enabled && classes.push("active");
        return classes;
      })}
      iconName={bind(bluetooth, "is-powered").as((enabled) =>
        enabled
          ? "bluetooth-active-symbolic"
          : "bluetooth-disabled-symbolic",
      )}
      label="Bluetooth"
      onClicked={() => {
        execAsync("wezterm -e sh -c 'printf \"\\033]0;BlueTUIth\\007\"; bluetuith'")
        App.remove_window(App.get_window(quicksettings)!);
      }}
    />  
  );
}
