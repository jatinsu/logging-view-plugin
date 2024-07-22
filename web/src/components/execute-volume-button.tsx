import { Button, ButtonProps, Tooltip } from '@patternfly/react-core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TestIds } from '../test-ids';

export const ExecuteVolumeButton: React.FC<ButtonProps> = ({ onClick, isDisabled }) => {
  const { t } = useTranslation('plugin__logging-view-plugin');

  return (
      <Tooltip content={<div>Gives the volume of data for a given label</div>}>
        <Button
          variant="secondary"
          data-test={TestIds.ExecuteVolumeButton}
          onClick={onClick}
          isDisabled={isDisabled}
        >
          {t('Explain Log Volume')}
        </Button>
      </Tooltip>
  );
};
