import { App } from "astal/gtk4";
import PanelButton from "../common/PanelButton";
import { WINDOW_NAME } from "../quicksettings/QSWindow";
import AstalBattery from "gi://AstalBattery";
import AstalWp from "gi://AstalWp";
import { bind } from "astal";
import AstalPowerProfiles from "gi://AstalPowerProfiles";
import Network from "gi://AstalNetwork";

export default function QSPanelButton() {
  const battery = AstalBattery.get_default();
  const wp = AstalWp.get_default();
  const speaker = wp?.audio.defaultSpeaker!;
  const powerprofile = AstalPowerProfiles.get_default();
  const network = Network.get_default();
  const wifi = network?.wifi!;

  return (
    <PanelButton
      window={WINDOW_NAME}
      onClicked={() => {
        App.toggle_window(WINDOW_NAME);
      }}
    >
      <box spacing={2}>
        <image
          marginEnd={2}
          visible={bind(powerprofile, "activeProfile").as(
            (p) => p === "power-saver",
          )}
          iconName={`power-profile-power-saver-symbolic`}
        />
        <image
          marginEnd={2}
          visible={bind(powerprofile, "activeProfile").as(
            (p) => p === "performance",
          )}
          iconName={`power-profile-performance-symbolic`}
        />
        <image
          visible={wp?.defaultMicrophone && bind(wp.default_microphone, "mute")}
          iconName="microphone-disabled-symbolic"
        />
        <image iconName={bind(wifi, "iconName")} />
        <image iconName={bind(speaker, "volumeIcon")} />
        <image iconName={bind(battery, "batteryIconName")} />
      </box>
    </PanelButton>
  );
}
