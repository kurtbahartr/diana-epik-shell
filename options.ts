import { execAsync, GLib } from "astal";
import { mkOptions, opt } from "./utils/option";
import { gsettings } from "./utils";

const options = mkOptions(
  `${GLib.get_user_config_dir()}/epik-shell/config.json`,
  {
    wallpaper: {
      folder: opt(GLib.get_home_dir(), { cached: true }),
      current: opt(
        await execAsync("swww query")
          .then((out) => out.split("image:")[1].trim())
          .catch(() => ""),
        { cached: true },
      ),
    },
    dock: {
      position: opt("bottom"),
      pinned: opt(["firefox", "Alacritty", "org.gnome.Nautilus", "localsend"]),
    },
    bar: {
      position: opt("top"),
      start: opt(["launcher", "workspace"]),
      center: opt(["time", "notification"]),
      end: opt(["network_speed", "quicksetting"]),
    },
    theme: {
      mode: opt(
        gsettings.get_string("color-scheme") == "prefer-light"
          ? "light"
          : "dark",
        { cached: true },
      ),
      bar: {
        bg_color: opt("$bg"),
        separator: opt(true),
        bg_opacity: opt(1),
        border_radius: opt(6),
        margin: opt(10),
        padding: opt(3),
        border_width: opt(2),
        border_color: opt("$fg"),
        shadow: {
          offset: opt([6, 6]),
          blur: opt(0),
          spread: opt(0),
          color: opt("$fg"),
          opacity: opt(1),
        },
        button: {
          bg_color: opt("$bg"),
          fg_color: opt("$fg"),
          opacity: opt(1),
          border_radius: opt(8),
          border_width: opt(0),
          border_color: opt("$fg"),
          padding: opt([0, 4]),
          shadow: {
            offset: opt([0, 0]),
            blur: opt(0),
            spread: opt(0),
            color: opt("$fg"),
            opacity: opt(1),
          },
        },
      },
      window: {
        opacity: opt(1),
        border_radius: opt(6),
        margin: opt(10),
        padding: opt(10),
        dock_padding: opt(6),
        desktop_clock_padding: opt(4),
        border_width: opt(2),
        border_color: opt("$fg"),
        shadow: {
          offset: opt([6, 6]),
          blur: opt(0),
          spread: opt(0),
          color: opt("$fg"),
          opacity: opt(1),
        },
      },
      light: {
        bg: opt("#ffb0cf"),
        fg: opt("#3c3836"),
        red: opt("#cc241d"),
      },
      dark: {
        bg: opt("#282828"),
        fg: opt("#ffb0cf"),
        red: opt("#cc241d"),
      },
    },
  },
);

export default options;
