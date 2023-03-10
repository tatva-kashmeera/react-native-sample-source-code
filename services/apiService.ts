export const apiService = async (
    endpoint: RequestInfo | URL,
    method = 'POST',
    params = '',
    headers = {'Content-Type': 'application/json'},
  ) => {
    return fetch(endpoint, {
      method,
      headers,
      body: params,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => ({
            success: true,
            data,
          }));
        }
      })
      .catch((error) => {
        return {
          message: 'Something went wrong, please try again later',
          success: false,
          data: '',
          error,
        };
      });
  };