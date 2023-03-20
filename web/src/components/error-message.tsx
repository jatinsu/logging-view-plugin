import { Alert, Text, TextContent, TextVariants } from '@patternfly/react-core';
import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { isFetchError } from '../cancellable-fetch';
import { notUndefined } from '../value-utils';
import './error-message.css';

interface ErrorMessageProps {
  error: unknown | Error;
}

const Suggestion: React.FC = ({ children }) => (
  <Text component={TextVariants.small}>{children}</Text>
);

const messages: (t: TFunction) => Record<string, React.ReactElement> = (t) => ({
  'max entries limit': (
    <>
      <Suggestion>{t('Select a smaller time range to reduce the number of results')}</Suggestion>
      <Suggestion>
        {t('Select a namespace, pod, or container filter to improve the query performance')}
      </Suggestion>
      <Suggestion>
        {t('Increase Loki &quot;max_entries_limit_per_query&quot; entry in configuration file')}
      </Suggestion>
    </>
  ),
  'deadline exceeded,maximum of series': (
    <>
      <Suggestion>{t('Select a smaller time range to reduce the number of results')}</Suggestion>
      <Suggestion>
        {t('Select a namespace, pod, or container filter to improve the query performance')}
      </Suggestion>
    </>
  ),
  'too many outstanding requests': (
    <>
      <Suggestion>{t('Select a smaller time range to reduce the number of results')}</Suggestion>
      <Suggestion>
        {t('Select a namespace, pod, or container filter to improve the query performance')}
      </Suggestion>
      <Suggestion>
        {t(
          "Ensure Loki config contains 'parallelise_shardable_queries: true' and 'max_outstanding_requests_per_tenant: 2048'",
        )}
      </Suggestion>
    </>
  ),
  'time range exceeds,maximum resolution': (
    <>
      <Suggestion>{t('Reduce the time range to decrease the number of results')}</Suggestion>
      <Suggestion>
        {t('Increase Loki &quot;max_query_length&quot; entry in configuration file')}
      </Suggestion>
    </>
  ),
  'cannot connect to LokiStack': (
    <>
      <Suggestion>{t('Make sure you have an instance of LokiStack runnning')}</Suggestion>
    </>
  ),
});

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const { t } = useTranslation('plugin__logging-view-plugin');

  let errorMessage = (error as Error).message || String(error);
  let title = t('You may consider the following query changes to avoid this error');
  const status = isFetchError(error) ? error.status : undefined;

  if (status !== undefined) {
    switch (status) {
      case 502:
        title = t('This plugin requires Loki Operator and LokiStack to be running in the cluster');
        errorMessage = 'cannot connect to LokiStack';
        break;
    }
  }

  const suggestions = React.useMemo(() => {
    const translatedMessages = messages(t);

    return Object.keys(translatedMessages)
      .map((messageKey) => {
        const errorKeys = messageKey.split(',');
        const hasErrorKey = errorKeys.some((key) => errorMessage.includes(key));
        return hasErrorKey ? translatedMessages[messageKey] : undefined;
      })
      .filter(notUndefined);
  }, [errorMessage, t]);

  return (
    <>
      <Alert
        className="co-logs-error_message"
        variant="danger"
        isInline
        isPlain
        title={errorMessage}
      />

      {suggestions && suggestions.length > 0 ? (
        <TextContent>
          <Text component={TextVariants.p}>{title}</Text>

          {suggestions}
        </TextContent>
      ) : null}
    </>
  );
};
