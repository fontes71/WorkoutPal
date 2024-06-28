import { QuantityConsumed } from "@/app/food/details/[id]"

export type InfoProps = {
    food: Food,
    quantityConsumed: QuantityConsumed,
    setQuantityConsumed: React.Dispatch<React.SetStateAction<QuantityConsumed>>
  }

