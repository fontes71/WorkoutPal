import { TouchableOpacity, Image } from "react-native";
import {  useState } from "react";
import { Text, View } from "@/components/Themed";
import styles from "./styles";

const More: React.FC<MoreProps> = ({
  fiber,
  saturatedFats,
  salt,
  sodium,
  sugars,
  nutriscoreGrade,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <View style={styles.moreContainer}>
      <MoreButton
        buttonClicked={buttonClicked}
        setButtonClicked={setButtonClicked}
      />
      {buttonClicked && (
        <MoreInfo
          fiber={fiber}
          saturatedFats={saturatedFats}
          salt={salt}
          sodium={sodium}
          sugars={sugars}
          nutriscoreGrade={nutriscoreGrade}
        />
      )}
    </View>
  );
};

const MoreButton: React.FC<MoreButtonProps> = ({
  buttonClicked,
  setButtonClicked,
}) => (
  <TouchableOpacity
    onPress={() => setButtonClicked(!buttonClicked)}
    style={styles.moreButton}
  >
    <Text style={styles.text_small}>{buttonClicked ? "Less" : "More"}</Text>
    <Image
      source={require("@/assets/images/down-arrow.png")}
      style={styles.arrowIcon}
    />
  </TouchableOpacity>
);

const MoreInfo: React.FC<MoreProps> = ({
  fiber,
  saturatedFats,
  salt,
  sodium,
  sugars,
  nutriscoreGrade,
}) => (
  <View style={styles.moreInfoContainer}>
    <InfoText label="Fiber" value={fiber} />
    <InfoText label="Saturated Fats" value={saturatedFats} />
    <InfoText label="Salt" value={salt} />
    <InfoText label="Sodium" value={sodium} />
    <InfoText label="Sugars" value={sugars} />
    <InfoText label="Nutriscore Grade" value={nutriscoreGrade} />
  </View>
);

const InfoText: React.FC<InfoTextProps> = ({ label, value }) => (
  <Text>
    {label}: {value}
  </Text>
);

export default More;
