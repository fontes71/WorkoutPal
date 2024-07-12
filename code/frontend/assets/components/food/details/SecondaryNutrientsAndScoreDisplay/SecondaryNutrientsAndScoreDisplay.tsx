import { TouchableOpacity, Image, Text, View, FlatList  } from "react-native";
import {  useState } from "react";
import styles from "./styles";
import round from "@/assets/functions/round";
import Nutrient from "../../common/nutrient/Nutrient";
import { getSecondaryNutrientsAsList } from "./utils";

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

const SecondaryNutrientsAndScore: React.FC<SecondaryNutrientsAndScoreDisplayProps> = ({ secondaryNutrients, nutriscore }) => {
  const secondaryNutrientsList = getSecondaryNutrientsAsList(secondaryNutrients, nutriscore)

  return (
  <View style={styles.moreInfoContainer}>
         <FlatList
        data={secondaryNutrientsList}
        renderItem={({item}) => <SecondaryNutrient nutrientValue={item.value} nutrient={item.name} unit={item.unit}/>}
        keyExtractor={ (value, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
  </View>
  )
}




const SecondaryNutrient: React.FC<SecondaryNutrientProps> = ({ nutrientValue, nutrient, unit }) => {
  if (nutrientValue == null)
    return null
  if (typeof nutrientValue === 'string')
    return <Nutriscore nutriscore={nutrientValue}/>

  return <Nutrient nutrientValue={nutrientValue}  nutrient={nutrient} unit={unit}/>
}


const Nutriscore: React.FC<NutriscoreProps> = ({ nutriscore }) => {
  if (nutriscore == null)
    return null

  return (
      <View style={styles.nutriscoreWrapper}>
        <Text style={styles.nutriscoreValue}>
        {nutriscore}
        </Text>
        <Text style={styles.nutriscore}>
        Nutriscore
        </Text>
      </View>
)}


export default SecondaryNutrientsAndScoreDisplay;
