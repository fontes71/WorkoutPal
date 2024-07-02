
export type DetailsProps = {
  user: User,
  food: Food
    hook: any
  }

  export enum FoodDetailsHookType {
    Log = "Log",
    Update = "Update"
  }

  export type ButtonProps = {
    hook: () => void
  }