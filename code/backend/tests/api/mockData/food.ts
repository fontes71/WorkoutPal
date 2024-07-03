export const mock_token = 'mockToken' 

export const date = "2024-05-05"

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


export const food = {
  id: "3284230006408",
  name: "Brioche Tranchée Bio",
  brand: "La-boulangere",
  quantity: {
    value:400,
    unit:"g"
  },
  imageUrl:
    "https://images.openfoodfacts.org/images/products/328/423/000/6408/front_fr.151.400.jpg",
  mainNutrients: {
    calories: 349,
    protein: {
      value: 8.7,
      unit: "g"
    },
    fat: {
      value: 10,
      unit: "g"
    },
    carbs: {
      value: 55,
      unit: "g"
    }
  },
  secondaryNutrients: {
      fiber: {
        value: 2.2,
        unit: "g"
      },
      saturatedFat: {
        value: 1,
        unit: "g"
      },
      salt: {
        value: 0.9,
        unit: "g"
      },
      sodium: {
        value: 0.36,
        unit: "g"
      },
      sugars: {
        value: 13,
        unit: "g"
      },
    },
    nutriscoreGrade: "b"
    }

export const mock_request_with_body = {
  body: {food: food, date: date},
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_with_body_with_invalid_date = {
  body: {food: food, date: "20-20-20"},
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const item_index = 1234

export const mock_request_with_query_and_params = {
  query: {
    date: date
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  },
  params: {
    itemIndex: "1234",
  },
} 
export const mock_request_with_query_and_params_with_invalid_date = {
  query: {
    date: "20-20-20"
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  },
  params: {
    itemIndex: "1234",
  },
} 

export const mock_request_with_params = {
  params: {
    date: date,
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_without_params = {
  params: {
    date: undefined
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};

export const mock_request_with_params_with_invalid_date = {
  params: {
    date: "20-20-20",
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};


export const mock_request_with_params_thats_not_a_string = {
  params: {
    date: 123,
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};