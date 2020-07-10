import {isPointWithinRadius} from 'geolib';

export const isWithinRadius = (radius, userLocation, itemLocation) => {
  return isPointWithinRadius(
    itemLocation,
    {
      latitude: parseFloat(userLocation.latitude),
      longitude: parseFloat(userLocation.longitude),
    },
    radius * 1000,
  );
};

export const isMineItem = (item, user) => {
  if (item.user.email === user.email) {
    return true;
  } else {
    return false;
  }
};

export const isSuitableForMe = (type, user, group) => {
  if (type !== 'donors') {
    switch (user.group) {
      case 'a+':
        if (group === 'a+' || group === 'ab+') {
          return true;
        } else {
          return false;
        }
      case '0+':
        if (
          group === 'b+' ||
          group === 'a+' ||
          group === '0+' ||
          group === 'ab+'
        ) {
          return true;
        } else {
          return false;
        }
      case 'b+':
        if (group === 'b+' || group === 'ab+') {
          return true;
        } else {
          return false;
        }
      case 'ab+':
        if (group === 'ab+') {
          return true;
        } else {
          return false;
        }
      case 'a-':
        if (
          group === 'a-' ||
          group === 'a+' ||
          group === 'ab-' ||
          group === 'ab+'
        ) {
          return true;
        } else {
          return false;
        }
      case '0-':
        return true;
      case 'b-':
        if (
          group === 'b-' ||
          group === 'b+' ||
          group === 'ab-' ||
          group === 'ab+'
        ) {
          return true;
        } else {
          return false;
        }
      case 'ab-':
        if (group === 'ab-' || group === 'ab+') {
          return true;
        } else {
          return false;
        }
    }
  } else {
    switch (user.group) {
      case 'a+':
        if (
          group === 'a+' ||
          group === 'a-' ||
          group === '0+' ||
          group === '0-'
        ) {
          return true;
        } else {
          return false;
        }
      case '0+':
        if (group === '0+' || group === '0-') {
          return true;
        } else {
          return false;
        }
      case 'b+':
        if (
          group === 'b+' ||
          group === 'b-' ||
          group === '0+' ||
          group === '0-'
        ) {
          return true;
        } else {
          return false;
        }
      case 'ab+':
        return true;
      case 'a-':
        if (group === 'a-' || group === '0-') {
          return true;
        } else {
          return false;
        }
      case '0-':
        if (group === '0-') {
          return true;
        } else {
          return false;
        }
      case 'b-':
        if (group === 'b-' || group === '0-') {
          return true;
        } else {
          return false;
        }
      case 'ab-':
        if (
          group === 'ab-' ||
          group === 'b-' ||
          group === 'a-' ||
          group === '0-'
        ) {
          return true;
        } else {
          return false;
        }
    }
  }
};
