import { App } from "astal/gtk4";
import windows from "./windows";
import { windowAnimation, windowBlur } from "./utils/hyprland";
import request from "./request";
import { initGtkStyle } from "./utils/style";

export default async function start(style) {
  await initGtkStyle();

  App.start({
    css: style,
    requestHandler(req, res) {
      request(req, res);
    },
    main() {
      windows.map((win) => App.get_monitors().map(win));

      windowAnimation();
      windowBlur();
    },
  });
}
