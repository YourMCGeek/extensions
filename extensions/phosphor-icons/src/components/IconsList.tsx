import { List } from "@raycast/api";
import { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import upperFirst from "lodash/upperFirst";
import { getIconUrl, weights } from "../utils/helpers";
import { IconEntry } from "@phosphor-icons/core";
import IconActionPanel from "./IconActionPanel";

type Props = {
  weight: string;
  icons: IconEntry[];
  setSearch: (text: string) => void;
  setWeight: (text: string) => void;
};

const IconsList = ({ weight, icons, setWeight, setSearch }: Props) => {
  const debouncedSetSearch = useMemo(() => debounce(setSearch, 300), [setSearch]);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <List
      searchBarPlaceholder="Search icons by name, category or tag"
      onSearchTextChange={debouncedSetSearch}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Icon Weight"
          placeholder="Icon Weight"
          storeValue={true}
          defaultValue={weight}
          onChange={setWeight}
        >
          {weights.map((type) => (
            <List.Dropdown.Item key={type} title={upperFirst(type)} value={type} />
          ))}
        </List.Dropdown>
      }
    >
      {icons.map((i) => {
        const weightText = weight !== "regular" ? `weight="${weight}"` : "";
        const weightClassName = weight !== "regular" ? `ph-${weight}` : "ph";
        return (
          <List.Item
            key={i.name}
            title={i.name}
            icon={{
              source: getIconUrl(i.name, weight),
              tintColor: { light: "black", dark: "white" },
            }}
            actions={
              <IconActionPanel
                name={i.name}
                pascalName={i.pascal_name}
                weight={weight}
                weightText={weightText}
                weightClassName={weightClassName}
              />
            }
          />
        );
      })}
    </List>
  );
};

export default IconsList;
