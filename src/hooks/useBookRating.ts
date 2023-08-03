import { useStore } from "../store";

const useBookRating = (id: string) => {
  const { loadRatingById } = useStore();
  return loadRatingById(id);
}

export default useBookRating;