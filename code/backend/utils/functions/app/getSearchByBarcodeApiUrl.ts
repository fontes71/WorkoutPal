const getSearchByBarcodeApiUrl = (barcode: number) => {
    return  `https://world.openfoodfacts.net/api/v2/product/${barcode}`;
  };
  
  export default getSearchByBarcodeApiUrl;