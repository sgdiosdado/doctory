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

export type userInformation = {
  first_name: string,
  last_name: string,
  email: string,
  location?: string,
  dob?: string,
  sex?: string,
  patient?: {
    blood_type: string,
    alergies: string[],
  }
  medic?: {
    license: string,
    specialties: string[],
  },
  type: string[],
}

export type timeLineItemProps = {
  conditionTitle: string,
  date_of_diagnosis: string,
  conditionType?: string,
  conditionSubtype?: string,
  conditionDescription?: string,
}