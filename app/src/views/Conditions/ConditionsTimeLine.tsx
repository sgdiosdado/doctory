import React from 'react';
import { TimeLine } from '../../components/TimeLine/TimeLine';
import { TimeLineItem } from '../../components/TimeLine/TimeLineItem';
import { ConditionData } from '../../http/types';

type ConditionsTimeLineProps = {
  conditions: ConditionData[];
}

export const ConditionsTimeLine = ({ conditions }:ConditionsTimeLineProps) => {
  return(
    <TimeLine>
      {conditions.map((condition:ConditionData) => (
        <TimeLineItem 
          key={condition.id}
          conditionTitle={condition.name}
          date_of_diagnosis={condition.date_of_diagnosis}
          conditionDescription={condition.description}
        />
      ))}
    </TimeLine>
  )
}