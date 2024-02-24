import {Db, MongoClient, ServerApiVersion} from 'mongodb'
import { fetchData } from '../utils/functions';
import { exercisedb_url, exercisedb_options } from '../utils/constants';
import dotenv from 'dotenv'

dotenv.config()

const WORKOUTPAL_MONGO_URI = process.env.WORKOUTPAL_MONGO_URI as string;

const client = new MongoClient(WORKOUTPAL_MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


export async function mongodbHandler(action: (db: Db) => Promise<any>) {
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
  let exercises = await fetchData(exercisedb_url, exercisedb_options) // fetchData inside server file
  exercises.forEach(obj => {
    obj._id = obj.id
    delete obj.id
  });
  
  await mongodbHandler(async (db: Db) => {
    const exercisesCollection = db.collection("Exercises")
    await exercisesCollection.insertMany(exercises)
  })
}
// !!!!!!!!!!!!!!!!!!!!