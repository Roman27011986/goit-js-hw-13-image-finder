const apiKey = '19349561-1c4da8557b38d24bee91f401b';

export default {
  serchQuery: '',
  page: 1,
  fetchHits() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.serchQuery}&page=${this.page}&per_page=14&key=${apiKey}`;
    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      });
  },

  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.serchQuery;
  },
  set query(value) {
    this.serchQuery = value;
  },
};
