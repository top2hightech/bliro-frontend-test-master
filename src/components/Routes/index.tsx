import { Route, Routes } from "react-router-dom";
import Library from "../../pages/library";
import Detail from "../../pages/detail";
import Wishlist from "../../pages/wishlist";
import PageNotFound from "../../pages/404";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/" element={<Library />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}