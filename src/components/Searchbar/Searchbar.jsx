import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  //  функция где получаем то, что ввели в инпут
  handleChange = event => {
    this.setState({ searchWord: event.currentTarget.value.toLowerCase() });
  };

  // функция отправки формы
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.searchWord.trim() === '') {
      alert('Please, enter your request');
      return;
    }
    this.props.onSubmit(this.state.searchWord);
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.handleFormSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchWord}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
