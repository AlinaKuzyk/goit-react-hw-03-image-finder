const GalleryItem = ({ webformatURL, tags }) => {
  return (
    <li class="gallery-item">
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default GalleryItem;
