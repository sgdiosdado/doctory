export type userInformation = {
  first_name: string,
  last_name: string,
  dob: string,
  email: string,
  location?: string,
  bloodType?: string,
  alergies?: [string],
}

export type timeLineItemProps = {
  conditionTitle: string,
  date_of_diagnosis: string,
  conditionType?: string,
  conditionSubtype?: string,
  conditionDescription?: string,
}