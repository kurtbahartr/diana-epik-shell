import { execAsync } from "astal";
import { App } from "astal/gtk4";
import { notifySend } from "../../utils";
import { timeout } from "astal";
import PanelButton from "../common/PanelButton";

export default function ColorPickerButton() {
  return (
    <PanelButton
      onClicked={() => {
        const wlCopy = (color: string) =>
          execAsync(["wl-copy", color]).catch(console.error);

        timeout(200, () => {
          execAsync("hyprpicker")
            .then((color) => {
              if (!color) return;

              wlCopy(color);
              notifySend({
                appName: "Hyprpicker",
                summary: "Color Picker",
                body: `${color} copied to clipboard`,
              });
            })
            .catch(console.error);
        });
      }}
      iconName={"color-select-symbolic"}
    />
  );
}
