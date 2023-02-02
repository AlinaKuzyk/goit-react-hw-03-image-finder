const fetchApi = (picture, amount) => {
  //   console.log(picture);
  return fetch(
    `https://pixabay.com/api/?q=${picture}&page=${amount}&key=32573949-757e2437ffc59d9864e13675e&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default fetchApi;
