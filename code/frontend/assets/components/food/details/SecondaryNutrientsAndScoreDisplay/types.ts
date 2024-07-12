type SecondaryNutrientsAndScoreDisplayProps = {
  secondaryNutrients: SecondaryNutrients;
  nutriscore: string | null
};

type ShowItemsButtonProps = {
  buttonClicked: boolean;
  setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

type NutriscoreProps = {
  nutriscore: string | null
}

type SecondaryNutrientProps = {
  nutrientValue: number | string,
  nutrient: string,
  unit: string | undefined

}