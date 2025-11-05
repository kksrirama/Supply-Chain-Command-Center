
import React from 'react';
import type { ExternalEvent } from '../types';
import Card from './Card';
import { AlertTriangleIcon, RefreshCwIcon } from './Icons';

interface EventAlertsProps {
  event: ExternalEvent | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const EventAlerts: React.FC<EventAlertsProps> = ({ event, loading, error, onRefresh }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full min-h-[200px]">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      );
    }
    if (error) {
      return <p className="text-red-400">{error}</p>;
    }
    if (!event || !event.summary) {
      return <p className="text-gray-400">No significant events detected.</p>;
    }
    // Simple markdown-like formatting for newlines
    const formattedSummary = event.summary.split('\n').map((line, index) => (
      <p key={index} className="mb-2">{line.replace(/^- /, '• ')}</p>
    ));

    return (
      <div>
        <div className="text-gray-200 prose prose-invert prose-sm max-w-none">{formattedSummary}</div>
        {event.sources && event.sources.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Sources:</h4>
            <ul className="space-y-1">
              {/* FIX: Check if source.maps exists before trying to access its properties */}
              {event.sources.map((source, index) => (
                 source.maps && (
                  <li key={index}>
                      <a 
                        href={source.maps.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 text-xs truncate transition-colors"
                      >
                        {source.maps.title || source.maps.uri}
                      </a>
                  </li>
                 )
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card className="flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
                <AlertTriangleIcon className="h-6 w-6 mr-3 text-yellow-400" />
                <h3 className="text-lg font-semibold text-gray-200">External Event Alerts</h3>
            </div>
            <button onClick={onRefresh} disabled={loading} className="p-2 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <RefreshCwIcon className={`h-5 w-5 text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
        <div className="p-4 flex-grow">
            {renderContent()}
        </div>
    </Card>
  );
};

export default EventAlerts;