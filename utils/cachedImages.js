let cachedResults

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await performSearch({ expression: '' }); // Modify the default expression value here if needed
    cachedResults = fetchedResults
  }

  return cachedResults
}