import dotenv from 'dotenv'
import { WorkoutPlan } from '../domain/types';
dotenv.config()

export const foodfacts_url = 'https://world.openfoodfacts.net/api/v2/product/3017624010701';
export const foodfacts_options = {
  method: 'GET'
}

export const exercisedb_url = 'https://exercisedb.p.rapidapi.com/exercises?limit=1500';
export const exercisedb_options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
}

export const WORKOUTPAL_MONGO_URI: string | undefined = process.env.WORKOUTPAL_MONGO_URI;
export const TEST_MONGO_URI: string | undefined = process.env.TEST_MONGO_URI;

export const ALREADY_EXISTS_WORKOUTPLAN: WorkoutPlan = { name: "testWorkoutPlanName", description: "testDescription", exercises: [] };