import { View } from "react-native"
import FoodCover from "@/assets/components/FoodCover"
import Quantity from "../quantity/Quantity"
import React, { useState } from "react"
import { styles } from "./styles"
import { InfoProps } from "./types"
import MainNutrientsDisplay from "../mainNutrientsDisplay/MainNutrientsDisplay"
import SecondaryNutrientsAndScoreDisplay from "../SecondaryNutrientsAndScoreDisplay/SecondaryNutrientsAndScoreDisplay"


const Overview: React.FC<InfoProps> = ({ food, quantity, updateQuantity, mainNutrients, secondaryNutrients }) => (
      <>
       <View style={styles.overviewWrapper}>
        <FoodCover imageUrl={food.imageUrl} />
        <MainNutrientsDisplay mainNutrients={mainNutrients} />
      </View>
      <Quantity quantity={quantity} updateQuantity={updateQuantity} />
      <SecondaryNutrientsAndScoreDisplay
        secondaryNutrients={secondaryNutrients}
        nutriscore={food.nutriscoreGrade}
      />
      </>
    )
  

export default Overview