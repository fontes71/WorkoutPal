import getDate from "@/assets/functions/getDate";
import { consumedFoodOfTheDay } from "@/services/food";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../auth/AuthContext";

const fetchConsumedFoodHook = (
  user: User | null,
  setFood: React.Dispatch<React.SetStateAction<Food[] | null>>
) => {
  useEffect(() => {
    if (user == null) return;

    const fetchConsumedFoodOfTheDay = async () => {
      const date = getDate();

      const food: Food[] | null = await consumedFoodOfTheDay(user?.token, date);

      setFood(food);
    };
    fetchConsumedFoodOfTheDay();
  }, []);
};

export default fetchConsumedFoodHook;
