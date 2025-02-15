import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import AstalWp from "gi://AstalWp";

export default function VolumeBox() {
  const speaker = AstalWp.get_default()?.audio.defaultSpeaker!;

  return (
    <box cssClasses={["qs-box", "volume-box"]} valign={Gtk.Align.CENTER}>
      <image iconName={bind(speaker, "volumeIcon")} valign={Gtk.Align.CENTER} />
      <slider
        onChangeValue={(self) => {
          speaker.volume = self.value;
        }}
        value={bind(speaker, "volume")}
        hexpand
      />
    </box>
  );
}
