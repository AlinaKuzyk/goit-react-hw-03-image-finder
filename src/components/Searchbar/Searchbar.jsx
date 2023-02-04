import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchWord: '',
    amount: 1,
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
    this.setState({ searchWord: '', amount: 1 });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input
            className={css.searchForm_input}
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
