// Handle image preloading and management
export class ImageLoader {
  static preloadImages(images) {
    return images.map(item => {
      const img = new Image();
      img.src = item.image;
      return new Promise((resolve, reject) => {
        img.onload = () => resolve(item);
        img.onerror = reject;
      });
    });
  }
}