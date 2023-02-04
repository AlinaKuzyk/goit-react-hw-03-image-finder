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

    if (prevImage !== newImage) {
      this.setState({ status: 'pending' });
      fetchApi(newImage, this.state.amount)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          console.log(data.hits.length);
          console.log(data.total);
          if (data.hits.length === 0) {
            this.setState({ pictures: [], status: 'rejected' });
            return alert('There are no images for your request.');
          }
          if (data.hits.length > 0 && data.hits.length < 12) {
            this.setState({ pictures: [], status: 'rejected' });
            return alert('Ouupss...no more pictures');
          }
          this.setState({ pictures: data.hits, status: 'resolved' });
        });
    }

    if (prevState.amount !== this.state.amount && prevImage === newImage) {
      fetchApi(newImage, this.state.amount)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.setState({
            pictures: [...this.state.pictures, ...data.hits],
            status: 'resolved',
          });
        });
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
