import Network from "gi://AstalNetwork";
import QSButton from "../QSButton";
import { App } from "astal/gtk4";
import { execAsync } from "astal/process";
import { bind } from "astal";

export default function WifiQS() {
  const network = Network.get_default();
  const wifi = network?.wifi!;
  const getWifiStatusLabel = () => {
    if (wifi.ssid) {
      return wifi.ssid; // SSID is displayed if WiFi connection detected.
    } else {
      return "WiFi"; // Plain old "WiFi" is displayed otherwise.
    }
  }
  return (
    <QSButton
      cssClasses={bind(wifi, "enabled").as((enabled) => {
        const classes = ["qs-button"];
        enabled && classes.push("active");
        return classes;
      })}
      iconName={bind(wifi, "iconName")}
      label={getWifiStatusLabel()}
      onClicked={() => {
        execAsync("wezterm -e sh -c 'printf \"\\033]0;Network Manager TUI\\007\"; nmtui'")
        App.remove_window(App.get_window(quicksettings)!);
      }}
    />  
  );
}
