import {makeLatLngBounds} from '../../utils/geoUtils';
import {toJSONString} from '../../utils';

class OfflineCreatePackOptions {
  constructor(options = {}) {
    this._assert(options);

    this.name = options.name;
    this.styleURL = options.styleURL;
    if (options.bounds) this.bounds = this._makeLatLngBounds(options.bounds)
    if (options.geometry) this.geometry = JSON.stringify(options.geometry)
    this.minZoom = options.minZoom;
    this.maxZoom = options.maxZoom;
    this.metadata = this._makeMetadata(options.metadata);
  }

  _assert(options) {
    if (!options.styleURL) {
      throw new Error(
        'Style URL must be provided for creating an offline pack',
      );
    }

    if (!options.name) {
      throw new Error('Name must be provided for creating an offline pack');
    }

    if (!(options.bounds || options.geometry)) {
      throw new Error('Bounds or geometry must be provided for creating an offline pack');
    }
  }

  _makeLatLngBounds(bounds) {
    const ne = bounds[0];
    const sw = bounds[1];
    return toJSONString(makeLatLngBounds(ne, sw));
  }

  _makeMetadata(metadata) {
    return JSON.stringify({
      ...metadata,
      name: this.name,
    });
  }
}

export default OfflineCreatePackOptions;
