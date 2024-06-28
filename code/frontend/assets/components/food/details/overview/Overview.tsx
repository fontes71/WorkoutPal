import { View } from "react-native"
import OverviewText from "../mainNutrientsDisplay/MainNutrientsDisplay"
import FoodCover from "@/assets/components/FoodCover"
import Quantity from "../quantity/Quantity"
import More from "../SecondaryNutrientsAndScoreDisplay/SecondaryNutrientsAndScoreDisplay"
import React, { useState } from "react"
import { styles } from "./styles"
import { InfoProps } from "./types"
import MainNutrientsDisplay from "../mainNutrientsDisplay/MainNutrientsDisplay"
import SecondaryNutrientsDisplay from "../SecondaryNutrientsAndScoreDisplay/SecondaryNutrientsAndScoreDisplay"
import SecondaryNutrientsAndScoreDisplay from "../SecondaryNutrientsAndScoreDisplay/SecondaryNutrientsAndScoreDisplay"




const Overview: React.FC<InfoProps> = ({ food, quantityConsumed, setQuantityConsumed }) => {
  const [mainNutrients, setMainNutrients] = useState<MainNutrients>(food.mainNutrients)
  const [secondaryNutrients, setSecondaryNutrients] = useState<SecondaryNutrients>(food.secondaryNutrients)


    return (
      <>
       <View style={styles.overviewWrapper}>
        <FoodCover imageUrl={food.imageUrl} />
        <MainNutrientsDisplay mainNutrients={mainNutrients} />
      </View>
      <Quantity quantity={quantityConsumed.value} quantityUnit={quantityConsumed.unit} />
      <SecondaryNutrientsAndScoreDisplay
        secondaryNutrients={secondaryNutrients}
        nutriscore={food.nutriscoreGrade}
      />
      </>
    )
}

export default Overview