import queryString from 'query-string';

export const spawnCommand = async (command) => {
  const queryParams = queryString.stringify({ command });
  const response = await fetch(`/api/spawn?${queryParams}`)
  return await response.json();
};
