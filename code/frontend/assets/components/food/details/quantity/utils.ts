export const onClose = (closeModal: () => void, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>>, quantity: ValueAndUnit) => {
    closeModal()
    setCurrentQuantity(quantity)
  }

export  const inputOnChange = (value:string, currentQuantity: CurrentQuantity, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>> ) => {
    const newValue = value && value.length > 0 ? parseInt(value) : null
  
    setCurrentQuantity({ ...currentQuantity, value: newValue })
  }
  
export  const getInputValue = (value: number | null) => value != null ? `${value}` : ``

export const setUnit = (unit: string, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>>) => {
  setCurrentQuantity(prevState => ({
    ...prevState,
    unit
  }));
};

export const handleSubmit = (currentQuantity: CurrentQuantity, setQuantity: React.Dispatch<React.SetStateAction<ValueAndUnit>>, closeModal: () => void) => {
  if( currentQuantity.value != null) {
    const updatedValueAndUnit: ValueAndUnit = {
      value: currentQuantity.value as number, 
      unit: currentQuantity.unit
    };

    setQuantity(updatedValueAndUnit);
  }
  closeModal()
}
  
export const UNIT_VALUES = [
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
  { label: "mg", value: "mg" },
  { label: "µg", value: "µg" },
  { label: "oz", value: "oz" },
  { label: "l", value: "l" },
  { label: "dl", value: "dl" },
  { label: "cl", value: "cl" },
  { label: "ml", value: "ml" }
];
