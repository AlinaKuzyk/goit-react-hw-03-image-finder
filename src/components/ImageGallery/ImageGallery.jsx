import { Component } from 'react';
import fetchApi from '../../api';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export class Gallery extends Component {
  state = {
    pictures: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.image;
    const newImage = this.props.image;

    //  this.setState({ loading: true });

    if (prevImage !== newImage) {
      // предыдущий пропс из App
      //  console.log('previous:', prevProps.image);
      //  актуальный пропс
      // console.log('this:', this.props.image);
      fetchApi(newImage, 1)
        .then(res => res.json())
        //   .then(data => console.log(data.hits));
        .then(data => this.setState({ pictures: data.hits }));
      //   .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <ul class="gallery">
        <h2>gallery</h2>
        {/* {!this.props.image && <p>enter your request</p>} */}
        {this.state.pictures.map(picture => {
          return (
            <GalleryItem
              key={picture.id}
              webformatURL={picture.webformatURL}
              largeImageURL={picture.largeImageURL}
            />
          );
        })}
      </ul>
    );
  }
}

export default Gallery;
