import { App, hook } from "astal/gtk4";
import { timeout } from "astal";
import ScreenRecord from "../../../utils/screenrecord";
import QSButton from "../QSButton";
import { WINDOW_NAME } from "../QSWindow";

export default function RecordQS() {
  const screenRecord = ScreenRecord.get_default();

  return (
    <QSButton
      setup={(self) => {
        hook(self, screenRecord, "notify::recording", () => {
          if (screenRecord.recording) {
            self.add_css_class("active");
          } else {
            self.remove_css_class("active");
          }
        });
      }}
      onClicked={() => {
        if (screenRecord.recording) {
          screenRecord.stop();
        } else {
          App.toggle_window(WINDOW_NAME);
          timeout(200, () => {
            screenRecord.start();
          });
        }
      }}
      iconName={"screencast-recorded-symbolic"}
      label={"Screen Record"}
    />
  );
}
