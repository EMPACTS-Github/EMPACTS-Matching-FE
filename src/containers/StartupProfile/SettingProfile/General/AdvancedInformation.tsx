import { Divider } from '@heroui/react'
import React from 'react'
import { UI_LABELS } from '@/constants'
import LabelStartAndSwitchEnd from '@/components/Switch/LabelStartAndSwitchEnd';
import { Startup } from '@/interfaces/StartupProfile';

interface AdvancedInformationProps {
  startup: Startup;
}

const AdvancedInformation = ({
  startup,
}: AdvancedInformationProps) => {
  return (
    <>
      <div className='font-semibold text-lg text-primary'>{UI_LABELS.ADVANCED_INFORMATION}</div>
      <Divider />
      <LabelStartAndSwitchEnd
        label={UI_LABELS.ACTIVE_USER}
        checked={startup.haveActiveUse ? true : false}
        onChange={() => {}}
      />
      <LabelStartAndSwitchEnd
        label={UI_LABELS.LATEST_REVENUE}
        checked={startup.revenue ? true : false}
        onChange={() => {}}
      />
      <LabelStartAndSwitchEnd
        label={UI_LABELS.LEGAL_EQUITY}
        checked={startup.legalEquityDetail ? true : false}
        onChange={() => {}}
      />
      <LabelStartAndSwitchEnd
        label={UI_LABELS.INVESTMENT}
        checked={startup.investmentDetail ? true : false}
        onChange={() => {}}
      />
      <LabelStartAndSwitchEnd
        label={UI_LABELS.FUNDRAISING}
        checked={startup.fundraisingDetail ? true : false}
        onChange={() => {}}
      />
    </>
  )
}

export default AdvancedInformation