import { useEffect } from 'react';
import { fetchProducts } from '../../../../../redux/slices';
import { useDispatch, useSelector } from "react-redux";

function useFetchProducts() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return products

}

export default useFetchProducts
