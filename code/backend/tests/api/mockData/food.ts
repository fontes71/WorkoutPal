export const mock_services_return_value = {
  value: "notImportantToTheTest",
};

export const mock_request_with_query = {
  query: {
    query: "notImportantToTheTest",
  },
};

export const mock_request_without_query = {
  query: {
    query: undefined,
  },
};

export const mock_request_with_query_thats_not_a_string = {
  query: {
    query: 123,
  },
};

export const mock_request_with_barcode_query = {
  query: {
    barcode: "123",
  },
};

export const mock_request_with_barcode_query_thats_not_a_string = {
  query: {
    barcode: 123,
  },
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
};
