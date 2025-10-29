import { Divider, Switch, Input } from '@heroui/react';
import React, { useState } from 'react';
import { UI_LABELS } from '@/constants';
import Typography from '@/components/Typography';

interface AdvancedInformation {
  activeUser?: string;
  revenue?: string;
  legalEquityDetail?: string;
  investmentDetail?: string;
  fundraisingDetail?: string;
}

interface AdvancedInformationProps {
  advancedInformation: AdvancedInformation;
  setAdvancedInformation: (advancedInformation: AdvancedInformation) => void;
}

const AdvancedInformation = ({
  advancedInformation,
  setAdvancedInformation,
}: AdvancedInformationProps) => {
  const [openAdvancedItems, setOpenAdvancedItems] = useState({
    activeUser: false || Boolean(advancedInformation.activeUser),
    revenue: false || Boolean(advancedInformation.revenue),
    legalEquityDetail: false || Boolean(advancedInformation.legalEquityDetail),
    investmentDetail: false || Boolean(advancedInformation.investmentDetail),
    fundraisingDetail: false || Boolean(advancedInformation.fundraisingDetail),
  });

  const advancedInformationItems = Object.keys(advancedInformation);
  const advancedInformationLabels = {
    activeUser: UI_LABELS.ACTIVE_USER,
    revenue: UI_LABELS.LATEST_REVENUE,
    legalEquityDetail: UI_LABELS.LEGAL_EQUITY,
    investmentDetail: UI_LABELS.INVESTMENT,
    fundraisingDetail: UI_LABELS.FUNDRAISING,
  };

  const handleChangeAdvancedInformation = (
    key: keyof AdvancedInformation,
    value: string | number
  ) => {
    setAdvancedInformation({
      ...advancedInformation,
      [key]: value,
    });
  };

  const handleOpenAdvancedItems = (key: keyof AdvancedInformation) => {
    setOpenAdvancedItems({
      ...openAdvancedItems,
      [key]: !openAdvancedItems[key],
    });
  };

  const renderAdvancedInformationItems = () => {
    return (advancedInformationItems as (keyof typeof advancedInformationLabels)[]).map((item) => (
      <div className='flex flex-col gap-2' key={item}>
        <div className='flex justify-between items-center' key={item}>
          <Typography type='p' variant='body-16-bold'>
            {advancedInformationLabels[item]}
          </Typography>
          <Switch
            checked={openAdvancedItems[item]}
            defaultSelected={openAdvancedItems[item]}
            onValueChange={() => handleOpenAdvancedItems(item)}
          />
        </div>
        {openAdvancedItems[item] && (
          <Input
            variant='bordered'
            value={advancedInformation[item]}
            onChange={(e) => handleChangeAdvancedInformation(item, e.target.value)}
          />
        )}
      </div>
    ));
  };

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Typography type='p' variant='body-28-bold' className='text-primary'>
          {UI_LABELS.ADVANCED_INFORMATION}
        </Typography>
        <Divider />
      </div>
      {renderAdvancedInformationItems()}
    </div>
  );
};

export default AdvancedInformation;
