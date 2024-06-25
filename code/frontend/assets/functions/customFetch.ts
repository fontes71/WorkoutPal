const customFetch = async (url: string, options = {}) => {
  const res = await fetch(url, options);
  const resValue = await res.json();
  return res.ok ? resValue.obj : null;
};

export default customFetch;
