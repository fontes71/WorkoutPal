const getSearchByNameApiUrl = (query: string) => {
  const fields =
    "id,product_name,product_name_en,image_front_url,quantity,product_quantity,product_quantity_unit,brands_tags,nutriscore_grade,nutriments";
  return `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&fields=${fields}&json=1`;
};

export default getSearchByNameApiUrl;
