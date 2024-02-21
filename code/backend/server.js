import fetch from "node-fetch" 
import {findExerciseById} from './data/mongodb/mongo-utils.js'
import dotenv from 'dotenv'
dotenv.config()

const foodfacts_url = 'https://world.openfoodfacts.net/api/v2/product/3017624010701';
const foodfacts_options = {
  method: 'GET'
}

export const fetchData = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    return data;
}

async function main() {
  const foodInfo = await fetchData(foodfacts_url, foodfacts_options)
  console.log(foodInfo)
  /*const exercise = await findExerciseById('0006')
  console.log("exercise-server", exercise)*/
}

main()