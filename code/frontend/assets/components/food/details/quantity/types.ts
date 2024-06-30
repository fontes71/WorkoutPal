type QuantityProps = {
    quantity: ValueAndUnit;
    updateQuantity: (newQuantity: ValueAndUnit) => void
  }

  type QuantityDisplayProps = {
    quantity: ValueAndUnit;
    openModal: () => void
  }

  type QuantityModalProps = {
    modalOpen: boolean,
    closeModal: () => void,
    quantity: ValueAndUnit;
    updateQuantity: (newQuantity: ValueAndUnit) => void
  }

  type CurrentQuantity = {
    value: number | null,
    unit: string
  }

  type InputsProps = {
    currentQuantity: CurrentQuantity;
    setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>>
  }

  type ButtonsProps = {
    closeModal: () => void,
    handleSubmit: () => void
  }