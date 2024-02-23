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