export const onClose = (closeModal: () => void, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>>, quantity: ValueAndUnit) => {
    closeModal()
    setCurrentQuantity(quantity)
  }

export  const inputOnChange = (value:string, currentQuantity: CurrentQuantity, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>> ) => {
    const newValue = value && value.length > 0 ? parseInt(value) : 0

    if (newValue < 1000000)
    setCurrentQuantity({ ...currentQuantity, value: newValue })
  }
  
export  const getInputValue = (value: number | null) => value != null ? `${value}` : ``

export const setUnit = (unit: string, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>>) => {
  setCurrentQuantity(prevState => ({
    ...prevState,
    unit
  }));
};

export const handleSubmit = (currentQuantity: CurrentQuantity, updateQuantity: (newQuantity: ValueAndUnit) => void, closeModal: () => void) => {
  if( currentQuantity.value != null) {
    const updatedValueAndUnit: ValueAndUnit = {
      value: currentQuantity.value as number, 
      unit: currentQuantity.unit
    };

    updateQuantity(updatedValueAndUnit);
  }
  closeModal()
}
  

