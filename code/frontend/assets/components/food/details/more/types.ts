type SecondaryNutrientsProps = {
    fiber: ValueAndUnit | null;
    saturatedFats:  ValueAndUnit | null;
    salt:  ValueAndUnit | null;
    sodium:  ValueAndUnit | null;
    sugars:  ValueAndUnit | null;
    nutriscoreGrade: string | null;
  };

  type MoreButtonProps = {
    buttonClicked: boolean;
    setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  };

  type InfoTextProps = {
    label: string;
    value: any;
  };
  