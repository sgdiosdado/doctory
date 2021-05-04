export const isValidDate = (value:string) => {
  const date_of_diagnosis = Date.parse(value);
  return date_of_diagnosis < Date.now();
}