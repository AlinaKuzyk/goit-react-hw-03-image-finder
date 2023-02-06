import { Component } from 'react';
import fetchApi from '../../api';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Spinner from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './Gallery.module.css';

export class Gallery extends Component {
  state = {
    pictures: [],
    totalPictures: 0,
    amount: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.image;
    const newImage = this.props.image;

    if (prevImage !== newImage || prevProps.page !== this.props.page) {
      if (prevState.pictures.length && this.props.page === 1) {
        this.setState({ pictures: [] });
      }
      this.setState({ status: 'pending' });

      fetchApi(newImage, this.props.page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(response => {
          //  console.log(response.totalHits);
          if (newImage !== prevImage) {
            this.setState({
              pictures: response.hits,
              totalPictures: response.totalHits,
              amount: 1,
              status: 'resolved',
            });
          }

          if (response.hits.length === 0) {
            this.setState({ pictures: [], status: 'rejected' });
            return alert('There are no images for your request.');
          } else {
            this.setState({
              pictures: [...this.state.pictures, ...response.hits],
              totalPictures: response.totalHits,
              status: 'resolved',
            });
          }
        });
    }
  }

  handleLoadMore = () => {
    this.props.onBtn();
  };

  render() {
    const { status, pictures, totalPictures } = this.state;

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.imageGallery}>
            {pictures.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <GalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          </ul>
          {pictures.length < totalPictures && (
            <Button onClick={this.handleLoadMore} />
          )}
        </>
      );
    }
  }
}

export default Gallery;
