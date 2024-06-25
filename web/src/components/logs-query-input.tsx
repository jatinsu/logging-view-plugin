import { Form, FormGroup, TextArea } from '@patternfly/react-core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogQLQuery } from '../logql-query';
import { TestIds } from '../test-ids';
import { ExecuteQueryButton } from './execute-query-button';
import './logs-query-input.css';
import { ToggleButton } from './toggle-button';

interface LogsQueryInputProps {
  value: string;
  onChange?: (expression: string) => void;
  onRun?: () => void;
  isDisabled?: boolean;
  invalidQueryErrorMessage?: string | null;
}

export const LogsQueryInput: React.FC<LogsQueryInputProps> = ({
  value = '',
  onChange,
  onRun,
  isDisabled,
  invalidQueryErrorMessage,
}) => {
  const { t } = useTranslation('plugin__logging-view-plugin');

  const [internalValue, setInternalValue] = React.useState(value);
  const [isStatsShown, setIsStatsShown] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      (e.ctrlKey || e.shiftKey || e.metaKey) &&
      e.key === 'Enter' &&
      internalValue.trim().length > 0
    ) {
      onRun?.();
    }
  };

  React.useEffect(() => {
    setInternalValue(value);
    const parsedQuery = new LogQLQuery(value);

    setIsValid(parsedQuery.streamSelector.length > 0);
  }, [value]);

  const handleOnChange = (text: string) => {
    setInternalValue(text);
    onChange?.(text);
  };

  const hasError =
    !isValid || (invalidQueryErrorMessage !== undefined && invalidQueryErrorMessage !== null);

  return (
    <>
      <div className="co-logs-expression-input" data-test={TestIds.LogsQueryInput}>
        <Form className="co-logs-expression-input__form">
          <FormGroup
            type="string"
            helperTextInvalid={
              !isValid
                ? `${t(
                    'Invalid log stream selector. Please select a namespace, pod or container as filter, or add a log stream selector like: ',
                  )} { log_type =~ ".+" } | json`
                : invalidQueryErrorMessage
            }
            fieldId="selection"
            validated={hasError ? 'error' : undefined}
          >
            <TextArea
              className="co-logs-expression-input__searchInput"
              placeholder="LogQL Query"
              value={internalValue}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              aria-label="LogQL Query"
              validated={hasError ? 'error' : undefined}
            />
          </FormGroup>
        </Form>
        {onRun && (
          <ExecuteQueryButton
            onClick={onRun}
            isDisabled={value === undefined || value.length === 0 || isDisabled}
          />
        )}
      </div>
      <div className="co-stats">
        <ToggleButton
          isToggled={isStatsShown}
          onToggle={setIsStatsShown}
          untoggledText={t('Show Stats')}
          toggledText={t('Hide Stats')}
        />
        {isStatsShown && onRun && (
          <div className="co-stats__content">
            <table>
              <tr>
                <tr>Bytes Processed Per Second <td>0 MB/s</td></tr>
                <tr>Execution Time <td>0 s</td></tr>
                <tr>Lines Processed Per Second <td>0</td></tr>
                <tr>Queue Time <td>0 s</td></tr>
                <tr>Total Bytes Processed <td>0 MB/s</td></tr>
                <tr>Total Lines Processed <td>0 </td></tr>
              </tr>
              <div>Ingester</div>
                <tr>
                  <tr>Compressed Bytes <td>0 MB</td></tr>
                  <tr>Decompressed Bytes <td>0 MB</td></tr>
                  <tr>Decompressed Lines <td>0 </td></tr>
                  <tr>Head Chunk Bytes <td>0 B</td></tr>
                  <tr>Head Chunk Lines <td>0 </td></tr>
                  <tr>Total Batches<td>0 </td></tr>
                  <tr>Total Chunks Matched <td>0 </td></tr>
                  <tr>Total Dupilcated <td>0 </td></tr>
                  <tr>Total Lines Sent <td> 0</td></tr>
                  <tr>Total Reached <td>0 </td></tr>
                </tr>
              <div>Store</div>
              <tr>
                <tr>Compressed Bytes<td>0 MB</td></tr>
                <tr>Decompressed Bytes<td>0 MB</td></tr>
                <tr>Decompressed Lines<td>0 </td></tr>
                <tr>Chunks Download Time<td>0 s</td></tr>
                <tr>Total Chunks Ref<td>0 </td></tr>
                <tr>Total Chunks Downloaded<td>0 </td></tr>
                <tr>Total Duplicates<td>0 </td></tr>
              </tr>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
