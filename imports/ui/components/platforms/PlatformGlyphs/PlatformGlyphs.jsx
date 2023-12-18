import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Import styles
import './PlatformGlyphs.sass';
import { PlatformsCollection } from '/imports/db/PlatformCollection';

/**
 * Functional component representing a set of platform glyphs based on the active platforms associated with a movie.
 * @returns {JSX.Element} The JSX element representing the platform glyphs.
 */
export const PlatformGlyphs = ({ activePlatforms }) => {
  const { platforms, isLoading } = useTracker(() => {
    // Initial data state when loading
    const noDataAvailable = { platforms: [], isLoading: true };

    // Subscribe to the 'Platforms' collection
    const handle = Meteor.subscribe('Platforms');

    // Return no data when subscription is not ready
    if (!handle.ready()) {
      return noDataAvailable;
    }

    // Fetch the platforms from the collection
    const platforms = PlatformsCollection.find().fetch();
    return { platforms, isLoading: false };
  });

  return (
    <div className='flex justify-content-center align-items-center'>
      {platforms.map((platform) => {
        const disabled = !activePlatforms.find(
          (activePlatform) => activePlatform._id === platform._id
        )
          ? 'disabled'
          : '';

        return (
          <div
            key={`platform-${platform.name}`}
            className={`platform-icon ${disabled} border-round-md mx-2 p-1`}
          >
            <img src={platform.logo} alt={`logo ${platform.name}`} />
          </div>
        );
      })}
    </div>
  );
};
