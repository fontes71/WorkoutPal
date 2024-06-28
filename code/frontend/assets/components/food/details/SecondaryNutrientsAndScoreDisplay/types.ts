type SecondaryNutrientsAndScoreDisplayProps = {
  secondaryNutrients: SecondaryNutrients;
  nutriscore: string | null
};

type ShowItemsButtonProps = {
  buttonClicked: boolean;
  setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

type SecondaryNutrientProps = {
  label: string;
  nutrient: ValueAndUnit | null;
};
