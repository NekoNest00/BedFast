
import React from 'react';

export function MapControls() {
  return (
    <>
      {/* Language selector - simple English implementation */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-900 px-3 py-1.5 rounded-md shadow-md text-xs font-medium">
          English
        </div>
      </div>
      
      {/* Map attribution notice */}
      <div className="absolute bottom-1 right-1 z-20 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 px-1 py-0.5 rounded text-[10px] text-muted-foreground">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:underline">OpenStreetMap</a> contributors
      </div>
    </>
  );
}

export default MapControls;
