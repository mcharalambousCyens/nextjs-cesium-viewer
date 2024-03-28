import React from 'react';

function StoryViewer(): JSX.Element {
  return (
    <div>
      <h2>Story Viewer</h2>
      <iframe
        title="Cesium Ion Story Viewer"
        src="https://ion.cesium.com/stories/viewer/?id=1d2c9453-2d53-4e90-8123-f14dbe176d11"
        width="100%"
        height="600px"
      />
    </div>
  );
}

export default StoryViewer;