import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data, value, setValue }) => (
      <Dropdown
        style={[styles.dropdown]}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => setValue((item.value))}
      />
  );


export default DropdownMenu;
