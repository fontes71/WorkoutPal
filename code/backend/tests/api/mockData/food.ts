export const mock_token = 'mockToken' 

export const mock_services_return_value = {
  value: "notImportantToTheTest",
};

export const mock_request_with_query = {
  query: {
    query: "notImportantToTheTest",
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_without_query = {
  query: {
    query: undefined
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_with_query_thats_not_a_string = {
  query: {
    query: 123,
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_with_barcode_query = {
  query: {
    barcode: "123",
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_with_barcode_query_thats_not_a_string = {
  query: {
    barcode: 123,
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const parsed_barcode = 123;

export const food_item = {
  id: "3284230006408",
  name: "Brioche Tranchée Bio",
  brand: "la-boulangere",
  quantityToPresent: "400g",
  quantity: "400",
  quantityUnit: "g",
  imageUrl:
    "https://images.openfoodfacts.org/images/products/328/423/000/6408/front_fr.151.400.jpg",
  calories: 349,
  protein: "8.7g",
  fat: "10g",
  carbs: "55g",
  fiber: "2.2g",
  saturatedFat: "1g",
  salt: "0.9g",
  sodium: "0.36g",
  sugars: "13g",
  nutriscoreGrade: "b",
}

export const mock_request_with_body = {
  body: food_item,
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const item_index = 1234

export const mock_request_with_params = {
  headers: {
    authorization: `Bearer ${mock_token}`,
  },
  params: {
    itemIndex: "1234",
  },
} 


