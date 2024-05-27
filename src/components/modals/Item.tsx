/* eslint-disable react-hooks/exhaustive-deps */
import ItemCard from "src/routes/exchanger/components/ItemCard";
import { ItemModalProps } from "src/types/PropsTypes";

export default function ItemModal({item}: ItemModalProps) {
  return <ItemCard item={item}/>
}