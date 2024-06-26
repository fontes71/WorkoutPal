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

export const mock_request_with_body = {
  body: {
    id: "3284230006408",
    name: "Brioche Tranchée Bio",
    calories: 349,
    protein: "8.7g",
    fat: "10g",
    carbs: "55g",
  },
  headers: {
    authorization: `Bearer ${mock_token}`,
  }
};
