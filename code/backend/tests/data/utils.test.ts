import getSearchByBarcodeApiUrl from "../../utils/functions/app/getSearchByBarcodeApiUrl";
import getSearchByNameApiUrl from "../../utils/functions/app/getSearchByNameApiUrl";

describe("getSearchByNameApiUrl", () => {
  it("returns successfully", async () => {
    const url = getSearchByNameApiUrl("something");
    expect(url).toBe(
      "https://world.openfoodfacts.org/cgi/search.pl?search_terms=something&fields=id,product_name,product_name_en,image_front_url,quantity,product_quantity,product_quantity_unit,brands_tags,nutriscore_grade,nutriments&json=1"
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