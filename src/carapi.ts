 export const fetchCars = () => {
  return fetch(import.meta.env.VITE_API_URL + "/cars")
    .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching cars: " + response.statusText);
    
    return response.json();
  })
}

export const deleteCar = (url: string) => {
  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting car: " + response.statusText);

    return response.json();
  })
}