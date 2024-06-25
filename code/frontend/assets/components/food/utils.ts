import getDate from '@/assets/functions/getDate';
import { consumedFoodOfTheDay } from '@/services/food';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../auth/AuthContext';

const fetchConsumedFoodHook = (userContext: User | null, setFood: React.Dispatch<React.SetStateAction<Food[] | null>> ) => {
  useEffect(() => {
    if (userContext == null)
      return

    const fetchConsumedFoodOfTheDay = async () => {
      const date = getDate();

      const food: Food[] | null = await consumedFoodOfTheDay(
        userContext?.token,
        date
      );

      setFood(food);
    };
    fetchConsumedFoodOfTheDay();
  }, []);
};

export default fetchConsumedFoodHook;