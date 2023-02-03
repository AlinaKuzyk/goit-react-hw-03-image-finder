import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import css from './GalleryItem.module.css';

class GalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleModalToggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItem_image}
          src={this.props.webformatURL}
          alt={this.props.tags}
          onClick={this.handleModalToggle}
        />
        {this.state.showModal && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            onModalClose={this.handleModalToggle}
          />
        )}
      </li>
    );
  }
}

export default GalleryItem;
