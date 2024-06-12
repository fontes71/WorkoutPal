type MoreProps = {
    fiber: string | null;
    saturatedFats: string | null;
    salt: string | null;
    sodium: string | null;
    sugars: string | null;
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
  