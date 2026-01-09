import { Action, ActionPanel, Clipboard, showHUD } from "@raycast/api";
import { getIconUrl } from "../utils/helpers";
import { showFailureToast } from "@raycast/utils";

type Props = {
  name: string;
  pascalName: string;
  weight: string;
  weightText: string;
  weightClassName: string;
};

const IconActionPanel = ({ name, weight, pascalName, weightText, weightClassName }: Props) => {
  return (
    <ActionPanel title="Copy to Clipboard">
      <Action.CopyToClipboard
        title="Copy Name"
        content={name}
        icon={{
          source: getIconUrl("clipboard-text", weight),
          tintColor: { light: "black", dark: "white" },
        }}
      />
      <Action
        title="Copy SVG Code"
        icon={{
          source: getIconUrl("file-svg", weight),
          tintColor: { light: "black", dark: "white" },
        }}
        onAction={async () => {
          try {
            const response = await fetch(getIconUrl(name, weight));
            if (!response.ok) {
              throw new Error(`Failed to fetch icon: ${response.statusText}`);
            }
            const fileContent = await response.text();
            await Clipboard.copy(fileContent);
            await showHUD("Copied to Clipboard");
          } catch (error) {
            await showFailureToast(error instanceof Error ? error.message : "Unknown error occurred", {
              title: "Failed to copy SVG",
            });
          }
        }}
      />
      <Action.CopyToClipboard
        title="Copy HTML"
        content={`<i class="${weightClassName} ph-${name}"></i>`}
        icon={{
          source: getIconUrl("brackets-angle", weight),
          tintColor: { light: "black", dark: "white" },
        }}
      />
      <Action.CopyToClipboard
        title="Copy React"
        content={`<${pascalName} ${weightText} size={32} />`}
        icon={{
          source: getIconUrl("atom", weight),
          tintColor: { light: "black", dark: "white" },
        }}
      />
      <Action.CopyToClipboard
        title="Copy Vue"
        content={`<ph-${name} ${weightText} :size="32" />`}
        icon={{
          source: getIconUrl("file-vue", weight),
          tintColor: { light: "black", dark: "white" },
        }}
      />
    </ActionPanel>
  );
};

export default IconActionPanel;
