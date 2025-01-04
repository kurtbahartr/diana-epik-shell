import AstalNotifd from "gi://AstalNotifd?version=0.1";
import PanelButton from "../common/PanelButton";
import { bind, Variable } from "astal";
import AstalApps from "gi://AstalApps?version=0.1";
import { WINDOW_NAME } from "../notification/NotificationWindow";
import { App } from "astal/gtk4";

const notifd = AstalNotifd.get_default();

function NotifIcon() {
  const getVisible = () =>
    notifd.dont_disturb ? true : notifd.notifications <= 0;
  const visibility = Variable(getVisible())
    .observe(notifd, "notify::dont-disturb", () => {
      return getVisible();
    })
    .observe(notifd, "notify::notifications", () => getVisible());

  return (
    <image
      visible={visibility()}
      cssClasses={["icon"]}
      iconName={bind(notifd, "dont_disturb").as(
        (dnd) => `notifications-${dnd ? "disabled-" : ""}symbolic`,
      )}
    />
  );
}

export default function NotifPanelButton() {
  const apps = new AstalApps.Apps();
  const substitute = {
    "Screen Recorder": "screencast-recorded-symbolic",
    Screenshot: "screenshot-recorded-symbolic",
    Hyprpicker: "color-select-symbolic",
  };

  return (
    <PanelButton
      window={WINDOW_NAME}
      onClicked={() => {
        App.toggle_window(WINDOW_NAME);
      }}
    >
      {bind(notifd, "dont-disturb").as((dnd) =>
        !dnd ? (
          <box spacing={6}>
            {bind(notifd, "notifications").as((n) => {
              if (n.length > 0) {
                return [
                  ...n.slice(0, 3).map((e) => {
                    const getFallback = (appName) => {
                      const getApp = apps.fuzzy_query(appName);
                      if (getApp.length != 0) {
                        return getApp[0].get_icon_name();
                      }
                      return "unknown";
                    };
                    const fallback =
                      e.app_icon.trim() === ""
                        ? getFallback(e.app_name)
                        : e.app_icon;
                    const icon = substitute[e.app_name] ?? fallback;
                    return <image iconName={icon} />;
                  }),
                  <label
                    visible={n.length > 3}
                    cssClasses={["circle"]}
                    label={""}
                  />,
                ];
              }
              return <NotifIcon />;
            })}
          </box>
        ) : (
          <NotifIcon />
        ),
      )}
    </PanelButton>
  );
}