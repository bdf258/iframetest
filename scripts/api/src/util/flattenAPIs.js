const flattenApis = (...apiList) => {
  const totalEndpoints = apiList.reduce(
    (acc, cur) => acc + Object.keys(cur).length,
    0
  );

  const flattenedApi = apiList.reduce((acc, cur) => ({ ...acc, ...cur }), {});

  if (Object.keys(flattenedApi).length < totalEndpoints) {
    const allNamedEndpoints = apiList
      .reduce((acc, cur) => [...acc, ...Object.keys(cur)], [])
      .sort();

    const duplicates = allNamedEndpoints.reduce(
      (acc, cur, idx, arr) => (cur === arr[idx + 1] ? [...acc, cur] : acc),
      []
    );

    throw new Error(
      `Api name conflict: ${duplicates.join(", ")} ${
        duplicates.length === 1 ? "endpoint has" : "endpoints have"
      } been declared twice or more times`
    );
  }

  return flattenedApi;
};

export default flattenApis;
