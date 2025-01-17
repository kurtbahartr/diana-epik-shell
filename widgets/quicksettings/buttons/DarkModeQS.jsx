import options from "../../../options";
import QSButton from "../QSButton";

export default function DarkModeQS({ ...props }) {
  const { mode } = options.theme;
  return (
    <QSButton
      cssClasses={mode((m) => {
        const classes = ["qs-button"];
        m === "dark" && classes.push("active");
        return classes;
      })}
      iconName={"dark-mode-symbolic"}
      label={"Dark Mode"}
      status={mode((m) => (m == "light" ? "Off" : "On"))}
      onClicked={() => {
        mode.set(mode.get() === "light" ? "dark" : "light");
      }}
      {...props}
    />
  );
}