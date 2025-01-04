import PopupWindow from "../common/PopupWindow";
import DarkModeQS from "./buttons/DarkModeQS";
import ColorPickerQS from "./buttons/ColorPickerQS";
import ScreenshotQS from "./buttons/ScreenshotQS";
import DontDisturbQS from "./buttons/DontDisturbQS";
import RecordQS from "./buttons/RecordQS";
import MicQS from "./buttons/MicQS";
import BrightnessBox from "./BrightnessBox";
import { Gtk } from "astal/gtk4";
import { WINDOW_NAME as POWERMENU_WINDOW } from "../powermenu/PowerMenu";
import { App } from "astal/gtk4";

export const WINDOW_NAME = "quicksettings";

function QSButtons() {
  return (
    <box vertical spacing={6}>
      <box homogeneous spacing={6}>
        <DarkModeQS />
        <ColorPickerQS />
        <ScreenshotQS />
      </box>
      <box homogeneous spacing={6}>
        <MicQS />
        <DontDisturbQS />
        <RecordQS />
      </box>
    </box>
  );
}

function Header() {
  return (
    <box hexpand={false} cssClasses={["header"]}>
      <label label={"Quick Setting"} hexpand xalign={0} />
      <button
        onClicked={() => {
          App.toggle_window(WINDOW_NAME);
          App.toggle_window(POWERMENU_WINDOW);
        }}
      >
        <image iconName={"system-shutdown-symbolic"} />
      </button>
    </box>
  );
}

export default function QSWindow(_gdkmonitor) {
  return (
    <PopupWindow name={WINDOW_NAME} layout="top_right" animation="slide top">
      <box
        cssClasses={["window-content", "qs-container"]}
        hexpand={false}
        vertical
      >
        <Header />
        <Gtk.Separator />
        <QSButtons />
        <BrightnessBox />
      </box>
    </PopupWindow>
  );
}