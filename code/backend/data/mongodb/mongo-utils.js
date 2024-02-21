import {MongoClient, ServerApiVersion} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const WORKOUTPAL_MONGO_URI = process.env.WORKOUTPAL_MONGO_URI

const client = new MongoClient(WORKOUTPAL_MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const exercisedb_url = 'https://exercisedb.p.rapidapi.com/exercises?limit=1500';
const exercisedb_options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
}

export async function findExerciseById(id) {
  return await mongodbHandler(async (db) => {
    const exercisesCollection = db.collection("Exercises")
    const exercise = await exercisesCollection.findOne({"id": id})
    return exercise
  })
}

async function mongodbHandler(action) {
  try {
      await client.connect();
      const db = client.db(process.env.DB_NAME)
      return await action(db)
  } finally {
      await client.close();
  }
}

// !!!!!!!!!!!!!!!!!!!! USE ONLY IN ON SETUP, IT CLONES THE WHOLE DB
async function cloneExerciseDB() {
  const exercises = await fetchData(exercisedb_url, exercisedb_options) // fetchData inside server file

  await mongodbHandler(async (db) => {
    const exercisesCollection = db.collection("Exercises")
    await exercisesCollection.insertMany(exercises)
  })
}
// !!!!!!!!!!!!!!!!!!!!