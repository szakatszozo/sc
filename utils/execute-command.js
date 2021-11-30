import queryString from 'query-string';

export const executeCommand = async (command) => {
  const queryParams = queryString.stringify({ command });
  let response = await fetch(`/api/exec?${queryParams}`)
  response = await response.json();
  return response;
};
