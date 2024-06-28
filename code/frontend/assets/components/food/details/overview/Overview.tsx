import { View } from "react-native"
import OverviewText from "../MainNutrients/MainNutrients"
import FoodCover from "@/assets/components/FoodCover"
import Quantity from "../quantity/Quantity"
import More from "../more/More"
import React, { useState } from "react"
import { styles } from "./styles"
import { InfoProps } from "./types"
import MainNutrients from "../MainNutrients/MainNutrients"
import SecondaryNutrients from "../more/More"

type MainNutrients = {
  calories: number,
  carbs: number,
  protein: number,
  fat: number
}


const Overview: React.FC<InfoProps> = ({ food, quantityConsumed, setQuantityConsumed }) => {
  const [mainNutrients, setMainNutrients] = useState()
  const [secondaryNutrients, setSecondaryNutrients] = useState()


    return (
      <>
       <View style={styles.overviewWrapper}>
        <FoodCover imageUrl={food.imageUrl} />
        <MainNutrients
          calories={food.calories}
          carbs={food.carbs}
          fat={food.fat}
          protein={food.protein}
        />
      </View>
      <Quantity quantity={quantityConsumed.value} quantityUnit={quantityConsumed.unit} />
      <SecondaryNutrients
        fiber={food.fiber}
        saturatedFats={food.saturatedFat}
        salt={food.salt}
        sodium={food.sodium}
        sugars={food.sugars}
        nutriscoreGrade={food.nutriscoreGrade}
      />
      </>
    )
}

export default Overview