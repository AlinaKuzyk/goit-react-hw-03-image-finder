import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Gallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchText: '',
    page: 1,
  };
  // передаем значения инпута из формы в Searchbar в State App
  handleSearch = searchText => {
    this.setState({ searchText, page: 1 });
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <div className={css.app}>
        {/* onSubmit это пропс, который мы потом передадим форме в Searchbar */}
        <Searchbar onSubmit={this.handleSearch} />
        {/* image прокидывает пропсом то, что мы ввели в инпут в форме */}
        <Gallery
          image={this.state.searchText}
          page={this.state.page}
          onBtn={this.changePage}
        />
      </div>
    );
  }
}
