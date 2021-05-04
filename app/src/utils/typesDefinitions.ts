export const userTypes = {
  PATIENT: 'PAT',
  MEDIC: 'MED',
}

export const sexTypes = {
  MALE: 'M',
  FEMALE: 'F',
  OTHER: 'O',
  NOT_SPECIFIED: 'U',
}

export type timeLineItemProps = {
  conditionTitle: string,
  date_of_diagnosis: string,
  conditionType?: string,
  conditionSubtype?: string,
  conditionDescription?: string,
}

export type doctorInformation = {
  name: string,
  lname: string,
  user: string,
  honorific: string,
}

export type patientInformation = {
  id: string,
  name: string,
  lname: string,
}