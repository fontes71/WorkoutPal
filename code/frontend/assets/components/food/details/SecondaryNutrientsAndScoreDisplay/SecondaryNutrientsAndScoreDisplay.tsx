import { TouchableOpacity, Image, Text, View  } from "react-native";
import {  useState } from "react";
import styles from "./styles";

const SecondaryNutrientsAndScoreDisplay: React.FC<SecondaryNutrientsAndScoreDisplayProps> = ({ secondaryNutrients, nutriscore }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <View style={styles.moreContainer}>
      <ShowItemsButton
        buttonClicked={buttonClicked}
        setButtonClicked={setButtonClicked}
      />
      {buttonClicked && (
        <SecondaryNutrientsAndScore secondaryNutrients={secondaryNutrients} nutriscore={nutriscore} />
      )}
    </View>
  );
};

const ShowItemsButton: React.FC<ShowItemsButtonProps> = ({
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

const SecondaryNutrientsAndScore: React.FC<SecondaryNutrientsAndScoreDisplayProps> = ({ secondaryNutrients, nutriscore }) => (
  <View style={styles.moreInfoContainer}>
    <SecondaryNutrient label="Fiber" nutrient={secondaryNutrients.fiber} />
    <SecondaryNutrient label="Saturated Fats" nutrient={secondaryNutrients.saturatedFat} />
    <SecondaryNutrient label="Salt" nutrient={secondaryNutrients.salt} />
    <SecondaryNutrient label="Sodium" nutrient={secondaryNutrients.sodium} />
    <SecondaryNutrient label="Sugars" nutrient={secondaryNutrients.sugars} />
    <Text>
    {"Nutriscore Grade"}: {nutriscore}
  </Text>
  </View>
);

const SecondaryNutrient: React.FC<SecondaryNutrientProps> = ({ label, nutrient }) => (
  nutrient !== null && (
    <Text>
      {label}: {nutrient.value} {nutrient.unit}
    </Text>
  ) 
);

export default SecondaryNutrientsAndScoreDisplay;
