import { buildFilterQuery } from "../../utils/functions/app/buildFilterQuery";
import getSearchByBarcodeApiUrl from "../../utils/functions/app/getSearchByBarcodeApiUrl";
import getSearchByNameApiUrl from "../../utils/functions/app/getSearchByNameApiUrl";

describe("getSearchByNameApiUrl", () => {
  it("returns successfully", async () => {
    const url = getSearchByNameApiUrl("something", 0, 0);
    expect(url).toBe(
      "https://world.openfoodfacts.org/cgi/search.pl?search_terms=something&fields=id,product_name,product_name_en,image_front_url,product_quantity,product_quantity_unit,brands_tags,nutriscore_grade,nutriments&page=0&page_size=0&json=1"
    );
  });
});

describe("getSearchByBarcodeApiUrl", () => {
    it("returns successfully", async () => {
      const url = getSearchByBarcodeApiUrl(1234);
      expect(url).toBe(
       `https://world.openfoodfacts.net/api/v2/product/1234`
    );
    });
});

describe("buildFilterQuery", () => {
  it("returns successfully", async () => {
    const query = buildFilterQuery("name", "bodyPart", "equipment", "target");
    console.log(query);
    expect(query).toEqual({
      name: { $regex: "name" },
      bodyPart: { $regex: "bodypart" },
      equipment: { $regex: "equipment" },
      target: { $regex: "target" },
    });
  });
});