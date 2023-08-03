import baseApi from "./base";

const loadBooksByPage = async (query: string, page: number, itemsPerPage: number) => {
  try {
    const startIdx = (page - 1) * itemsPerPage;
    const response = await baseApi.get("/volumes", {params: {q: query, startIndex: startIdx}});
    return response.data;
  } catch(e) {
    return null;
  }
}

const loadBookDetailById = async (id: string) => {
  try {
    const response = await baseApi.get(`/volumes/${id}`);
    return response.data;
  } catch(e) {
    return null;
  }
}

export default {
  loadBooksByPage,
  loadBookDetailById
}