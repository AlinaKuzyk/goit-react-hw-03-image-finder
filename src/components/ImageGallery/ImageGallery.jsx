import { Component } from 'react';
import fetchApi from '../../api';
import GalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Spinner from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './Gallery.module.css';

export class Gallery extends Component {
  state = {
    pictures: [],
    amount: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.image;
    const newImage = this.props.image;

    if (prevImage !== newImage || prevState.amount !== this.state.amount) {
      this.setState({ status: 'pending' });
      fetchApi(newImage, this.state.amount)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if (data.hits.length === 0) {
            this.setState({ pictures: data.hits, status: 'rejected' });
          } else {
            this.setState({
              pictures: [...this.state.pictures, ...data.hits],
              status: 'resolved',
            });
          }
        })
        .catch(error => this.setState({ status: 'rejected' }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevstate => ({ amount: prevstate.amount + 1 }));
  };

  render() {
    const { status } = this.state;

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'rejected') {
      return alert('There are no images with your request.');
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.imageGallery}>
            {this.state.pictures.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <GalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          </ul>
          <Button onClick={this.handleLoadMore} />
        </>
      );
    }
  }
}

export default Gallery;
