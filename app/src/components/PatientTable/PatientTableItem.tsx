import React from 'react'
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Td, Tr } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { patientInformation } from '../../utils/typesDefinitions'

// style={tdStyle}

type patientTableItemPropsTypes = {
  userData: patientInformation,
}

export const PatientTableItem = ({ userData }: patientTableItemPropsTypes) => {
  const uniqueID = userData.id;
  return (
      <Tr key={uniqueID}>
        <Td>{userData.name + ' ' + userData.lname}</Td>
        <Td>
          <Link to={routes.doctorPatients.path}>
            <ArrowForwardIcon />
          </Link>
        </Td>
      </Tr>
  )
}