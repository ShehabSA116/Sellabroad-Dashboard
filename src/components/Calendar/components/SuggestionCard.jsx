import React from 'react';

export function SuggestionCard({ event, onDismiss, navigate }) {
  const handleDismiss = () => {
    onDismiss(event.id);
  };

  return (
    <div className="border border-dashed border-purple-300 rounded-lg p-2 bg-purple-50/50 mb-2">
      <div className="flex items-center space-x-1 text-purple-600 text-sm mb-2 justify-center">
        <span>✨</span>
        <span> Suggestion</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-gray-600">🎯 {event.title}</span>
      </div>
      <h4 className="text-gray-800 text-sm font-medium mb-1">{event.description}</h4>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <span className="mr-2">📅 {event.daysLeft} day{event.daysLeft > 1 ? 's' : ''}</span>
      </div>
      <div className="flex flex-col items-center space-y-2 mt-2">
        <section className="flex flex-col space-y-2 w-full border p-2 ">
          <button
            onClick={() => navigate('/strategy/campaign/new', { 
              state: { 
                event: {
                  id: event.id,
                  title: event.title,
                  start_date: event.date,
                  end_date: event.date,
                  type: event.type
                }
              } 
            })}
            className="w-full py-2 border border-purple-300 rounded-md text-purple-600 text-sm font-medium hover:bg-purple-50"
          >
            Generate 
          </button>
          <button
            onClick={handleDismiss}
            className="w-full py-2 text-purple-600 text-sm font-medium hover:text-opacity-80"
          >
            Dismiss
          </button>
        </section>
      </div>
    </div>
  );
} 