import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Gallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    image: '',
  };
  // передаем значения инпута из формы в Searchbar в State App
  handleSearchFormSubmit = searchWord => {
    this.setState({ image: searchWord });
  };

  render() {
    return (
      <div>
        {/* onSubmit это пропс, который мы потом передадим форме в Searchbar */}
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {/* image прокидывает пропсом то, что мы ввели в инпут в форме */}
        <Gallery image={this.state.image} />
      </div>
    );
  }
}
