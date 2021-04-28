export type userInformation = {
  name: string,
  lname: string,
  dob: string,
  email: string,
  location?: string,
  bloodType?: string,
  alergies?: [string],
}

export type conditionTimeLine = {
  id: string,
  title: string,
  date: string, 
  description?: string,
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
  name: string,
  lname: string,
}