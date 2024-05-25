/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ItemData } from "./ProductListInventory";
import ProductCard from "./ProductCard";

type Props = {
  product:ItemData
}

export default function ProductModal({product}: Props) {

  return <ProductCard product={product}/>
}