import { Component } from 'react';
import fetchApi from '../../api';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export class Gallery extends Component {
  state = {
    pictures: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.image;
    const newImage = this.props.image;

    if (prevImage !== newImage) {
      // предыдущий пропс из App
      //  console.log('previous:', prevProps.image);
      //  актуальный пропс
      // console.log('this:', this.props.image);
      fetchApi(newImage, 1)
        .then(res => res.json())
        //   .then(pictures => console.log(pictures.hits));
        .then(data => this.setState({ pictures: data }));
    }
  }

  render() {
    return (
      <ul class="gallery">
        gallery
        {/* {this.state.pictures.map(picture => {
          return (
            <GalleryItem
              key={picture.id}
              webformatURL={picture.webformatURL}
              largeImageURL={picture.largeImageURL}
            />
          );
        })} */}
      </ul>
    );
  }
}

export default Gallery;
