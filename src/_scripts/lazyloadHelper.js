const imageProxy = require('norska/frontend/imageProxy');

module.exports = {
  /**
   * Initialize method to be called at page load
   * Will keep track of which images are lazyloaded or not
   **/
  init() {
    // Listen to lazyload images, and store which one we already have processed
    document.addEventListener('lazyloaded', (event) => {
      const { target } = event;
      const uuid = target.dataset.uuid;
      this.loaded[uuid] = true;
    });
  },
  // Keep track of which picture are already lazyloaded
  loaded: {},
  // Check if we have already loaded such an image
  isLoaded(objectId) {
    return !!this.loaded[objectId];
  },
  /**
   * Returns the list of HTML attributes to add to the <img /> tag
   * @param {string} originUrl URL to the full size image
   * @param {object} options Options
   * @param {string} options.cloudinary Cloudinary bucket to use (optional)
   * @param {object} options.imoen Imoen object holding image metadata (dimensions, lqip, hash)
   * @param {string} options.uuid A unique identifier for this image
   * @returns {object} Object of HTML attributes to add to an <img /> tag
   **/
  attributes(originUrl, options = {}) {
    const { cloudinary, imoen, uuid } = {
      cloudinary: null,
      imoen: {},
      uuid: originUrl,
      ...options,
    };
    const { hash, width, height, lqip } = imoen;

    const revvedUrl = `${originUrl}?v=${hash}`;
    const fullUrl = imageProxy(revvedUrl, {
      cloudinary,
    });

    const attributes = {
      width,
      height,
      lqip,
      fullUrl,
      dataUuid: uuid,
    };

    // Image has already been lazyloaded, so we display the full size directly
    if (this.loaded[uuid]) {
      return {
        ...attributes,
        cssClass: '',
        dataSrc: fullUrl,
        src: fullUrl,
      };
    }

    // This is the first time displaying the image, so we use the LQIP as
    // placeholder
    return {
      ...attributes,
      cssClass: 'lazyload',
      dataSrc: fullUrl,
      src: lqip,
      width,
      height,
    };
  },
};
