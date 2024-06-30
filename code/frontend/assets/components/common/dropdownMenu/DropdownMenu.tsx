import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import { View } from "react-native";

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data, value, setValue }) => (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => setValue((item.value))}
      />
    </View>
  );


export default DropdownMenu;
