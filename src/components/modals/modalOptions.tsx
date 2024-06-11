import { FormField, ListItem } from "src/types/PropsTypes"
import { ItemCategory, Location } from "src/types/Types"

export function selectLocations(locations: Location[]): FormField {
  const items: ListItem[] = locations.map(location =>(
    {
      key: location.id,
      value: location.name
    }))
  return { nombre: 'Selecciona una filial', etiqueta: 'employeeLocationId', tipo: 'list', items }
}

export function selectCategories(cats: ItemCategory[]): FormField {
  const items: ListItem[] = cats.map(cat => (
    {
      key: cat.id,
      value: cat.name
    }))
  return { nombre: 'Selecciona una categoria', etiqueta: 'itemCategoryId', tipo: 'list', items }
}