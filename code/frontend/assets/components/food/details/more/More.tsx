import { TouchableOpacity, Image, Text, View  } from "react-native";
import {  useState } from "react";
import styles from "./styles";

const SecondaryNutrients: React.FC<SecondaryNutrientsProps> = ({
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

const MoreInfo: React.FC<SecondaryNutrientsProps> = ({
  fiber,
  saturatedFats,
  salt,
  sodium,
  sugars,
  nutriscoreGrade,
}) => (
  <View style={styles.moreInfoContainer}>
    <InfoText label="Fiber" value={fiber?.value} />
    <InfoText label="Saturated Fats" value={saturatedFats?.value} />
    <InfoText label="Salt" value={salt?.value} />
    <InfoText label="Sodium" value={sodium?.value} />
    <InfoText label="Sugars" value={sugars?.value} />
    <InfoText label="Nutriscore Grade" value={nutriscoreGrade} />
  </View>
);

const InfoText: React.FC<InfoTextProps> = ({ label, value }) => (
  <Text>
    {label}: {value}
  </Text>
);

export default SecondaryNutrients;
