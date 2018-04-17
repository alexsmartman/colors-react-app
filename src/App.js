import React from 'react';
import './App.scss';
import Cards from './components/Cards';
import shortid  from 'shortid';


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      items: [],
    };
  }

  componentDidMount() {
    this.getFromLocalStorage();
  }

  getFromLocalStorage = () => {
    if (localStorage.getItem('items')) {
      this.setState({
        items: JSON.parse(localStorage.getItem('items')),
      })
    }
  };

  onChange = (event) => {
    this.setState({ color: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const color = this.state.color;
    const item = {'id': shortid.generate(), 'color': color, 'favorite': false};
    color && this.setState({
      items: [item, ...this.state.items],
      color: '',
    })
    color && localStorage.setItem('items', JSON.stringify([item, ...this.state.items]));
  }

  removeCard = (item, i) => {
    let cards = this.state.items.slice();
    cards.splice(i, 1);
    this.setState({
      items: cards
    });
    localStorage.setItem('items', JSON.stringify(cards));
  }

  setFavorite = (item, id, favorite) => {
    let cards = this.state.items.map(
      (item) => item.id ===  id ? Object.assign({}, item, {favorite: !favorite}) : item
    )
    this.setState({
      items: cards
    });
    localStorage.setItem('items', JSON.stringify(cards));
  }
  
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title">Управление карточками</h1>
        </header>
        <form className="App__form" onSubmit={this.onSubmit}>
          <input placeholder="HEX значение" value={this.state.color} onChange={this.onChange} title="23"/>
          <button>Добавить</button>
        </form>
        <Cards items={this.state.items} removeCard={this.removeCard} setFavorite={this.setFavorite}/>
      </div>
    );
  }
}

export default App;
