import { Divider } from '@heroui/react'
import React from 'react'
import { UI_LABELS } from '@/constants'
import LabelStartAndSwitchEnd from '@/components/Switch/LabelStartAndSwitchEnd';
import { Startup } from '@/interfaces/StartupProfile';
import Typography from '@/components/Typography';

interface AdvancedInformationProps {
  startup: Startup;
}

const AdvancedInformation = ({
  startup,
}: AdvancedInformationProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Typography type='p' variant='body-28-bold' className='text-primary'>{UI_LABELS.ADVANCED_INFORMATION}</Typography>
        <Divider />
      </div>
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
    </div>
  )
}

export default AdvancedInformation