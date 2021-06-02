import { Allergy, Specialty } from "../http/types"

export const userTypes = {
  PATIENT: 'PAT',
  MEDIC: 'MED',
}

export const sexTypes = [
  {value: 'F', label: 'Mujer'},
  {value: 'M', label: 'Hombre'},
  {value: 'O', label: 'Otro'},
  {value: 'U', label: 'Sin especificar'},
]

export type timeLineItemProps = {
  conditionTitle: string,
  date_of_diagnosis: string,
  conditionType?: string,
  conditionSubtype?: string,
  conditionDescription?: string,
}

export type InputArrType = {
  fetched: Allergy[] | Specialty[];
  toBeDeleted: Allergy[] | Specialty[];
  toBeAdded: Allergy[] | Specialty[];
}