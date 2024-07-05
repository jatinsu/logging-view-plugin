import React from 'react';
import { QueryRangeResponse } from '../logs.types';
import { Tooltip } from '@patternfly/react-core';
import { Tbody, Table, Td, Th, Thead, Tr } from '@patternfly/react-table';
import './stats-table.css';

interface StatsTableProps {
  logsData?: QueryRangeResponse;
}

export const StatsTable: React.FC<StatsTableProps> = ({ logsData }) => {
  return (
    <div>
      <div>Statistics</div>
      <div className="summary">
        <Table className="co-stats__content" variant="compact" aria-label="Statistics">
          <Thead>
            <Th className="co-table__header">Summary</Th>
            <Th></Th>
            <Th className="co-table__header">Ingester</Th>
            <Th></Th>
            <Th className="co-table__header">Storage</Th>
            <Th></Th>
          </Thead>

          <Tbody>
            <Tr>
              <Tooltip content="Total of bytes processed per second">
                <Td>Bytes Processed Per Second:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.bytesProcessedPerSecond ?? 'NA'} B/s </strong>
              </Td>

              <Tooltip content="Amount of ingesters reached">
                <Td>Total Reached:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.ingester.totalReached ?? 'NA'} B</strong>
              </Td>

              <Tooltip content="Total chunks found in the index for the current query">
                <Td>Total Chunks Referenced:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.querier.store?.totalChunksRef ?? 'NA'}</strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total lines processed per second">
                <Td> Lines Processed Per Second:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.linesProcessedPerSecond ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total chunks matched by ingesters">
                <Td>Total Chunks Matched:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.ingester.totalChunksMatched ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total of chunks downloaded">
                <Td>Total Chunks Downloaded:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.querier.store?.totalChunksDownloaded ?? 'NA'}</strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total amount of bytes processed overall for this request">
                <Td>Total Bytes Processed</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.totalBytesProcessed ?? 'NA'} B</strong>
              </Td>

              <Tooltip content="Total batches sent by ingesters">
                <Td>Total Batches:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.ingester.totalBatches ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total time spent downloading chunks in seconds">
                <Td>Chunks Download Time:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.querier.store?.chunksDownloadTime ?? 'NA'} s</strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total amount of lines processed overall for this request">
                <Td>Total Lines Processed:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.totalLinesProcessed ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total lines sent by ingesters">
                <Td>Total Lines Sent:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.ingester.totalLinesSent ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total bytes read from store head chunks">
                <Td>Head Chunk Bytes:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.querier.store?.chunk?.headChunkBytes ?? 'NA'} B
                </strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total execution time in seconds">
                <Td>Execution Time:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.execTime ?? 'NA'} s</strong>
              </Td>

              <Tooltip content="Total chunks found in the index for the current query by ingesters">
                <Td>Total Chunks Referenced:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.ingester.store?.totalChunksRef ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total lines read from store head chunks">
                <Td>Head Chunk Lines:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.querier.store?.chunk?.headChunkLines ?? 'NA'}</strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total queue time in seconds">
                <Td>Queue Time:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.queueTime ?? 'NA'} s</strong>
              </Td>

              <Tooltip content="Total of chunks downloaded">
                <Td>Total Chunks Downloaded:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.totalChunksDownloaded ?? 'NA'}
                </strong>{' '}
              </Td>

              <Tooltip content="Total bytes decompressed and processed by store">
                <Td>Decompressed Bytes:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.querier.store?.chunk?.decompressedBytes ?? 'NA'} B
                </strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total amount of sub queries">
                <Td>Sub Queries:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.subqueries ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total time spent downloading chunks in seconds">
                <Td>Chunks Download Time:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.ingester.store?.chunksDownloadTime ?? 'NA'} s</strong>
              </Td>

              <Tooltip content="Total lines decompressed and processed by the store">
                <Td>Decompressed Lines:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.querier.store?.chunk?.decompressedLines ?? 'NA'}{' '}
                </strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total amount of entries">
                <Td>Total Entries Returned:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.totalEntriesReturned ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total bytes read from ingesters head chunks">
                <Td>Head Chunk Bytes:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.chunk?.headChunkBytes ?? 'NA'} B
                </strong>
              </Td>

              <Tooltip content="Total bytes of compressed chunks (blocks) processed by the store">
                <Td>Compressed Bytes:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.querier.store?.chunk?.compressedBytes ?? 'NA'} B
                </strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total amount of splits">
                <Td>Splits:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.splits ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total lines read from ingesters head chunks">
                <Td>Head Chunk Lines:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.chunk?.headChunkLines ?? 'NA'}
                </strong>
              </Td>

              <Tooltip content="Total of duplicates removed from replication">
                <Td>Total Duplicates:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.querier.store?.chunk?.totalDuplicates ?? 'NA'}
                </strong>
              </Td>
            </Tr>

            <Tr>
              <Tooltip content="Total of shards">
                <Td>Shards:</Td>
              </Tooltip>
              <Td>
                <strong>{logsData?.data.stats.summary.shards ?? 'NA'}</strong>
              </Td>

              <Tooltip content="Total bytes decompressed and processed by ingesters">
                <Td>Decompressed Bytes:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.chunk?.decompressedBytes ?? 'NA'} B
                </strong>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>

            <Tr>
              <Td></Td>
              <Td></Td>
              <Tooltip content="Total lines decompressed and processed by ingesters">
                <Td>Decompressed Lines:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.chunk?.decompressedLines ?? 'NA'}
                </strong>{' '}
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>

            <Tr>
              <Td></Td>
              <Td></Td>
              <Tooltip content="Total bytes of compressed chunks (blocks) processed by ingesters">
                <Td>Compressed Bytes:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.chunk?.compressedBytes ?? 'NA'} B
                </strong>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>

            <Tr>
              <Td></Td>
              <Td></Td>
              <Tooltip content="Total of duplicates found by ingesters">
                <Td>Total Duplicates:</Td>
              </Tooltip>
              <Td>
                <strong>
                  {logsData?.data.stats.ingester.store?.chunk?.totalDuplicates ?? 'NA'}
                </strong>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </div>
  );
};
