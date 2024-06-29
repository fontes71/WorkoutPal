type QuantityProps = {
    quantity: ValueAndUnit;
    setQuantity: React.Dispatch<React.SetStateAction<ValueAndUnit>>
  }

  type QuantityDisplayProps = {
    quantity: ValueAndUnit;
    openModal: () => void
  }

  type QuantityModalProps = {
    modalOpen: boolean,
    closeModal: () => void,
    quantity: ValueAndUnit;
    setQuantity: React.Dispatch<React.SetStateAction<ValueAndUnit>>
  }

  type CurrentQuantity = {
    value: number | null,
    unit: string
  }