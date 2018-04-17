import React from 'react';
import './Cards.scss';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';


class Cards extends React.PureComponent {

  handleRemoveCard(item, i) {
    this.props.removeCard(item, i);
  }

  handleSetFavorite(item, id, favorite) {
    this.props.setFavorite(item, id, favorite);
  }

  render() {
    return (
      <div className="Cards">
        {this.props.items.map((item, index) =>
          <div className="Cards__item" key={item.id}>
            <div className="Cards__item__colorBox" style={{ backgroundColor: `#${item.color}` }}>
            </div>
            <div className="Cards__item__title">
              #{item.color}
            </div>
            <div className="Cards__item__buttons">
              <FontAwesome 
                onClick={() => { this.handleSetFavorite(item.color, item.id, item.favorite) }} 
                name={item.favorite === true ? 'star' : 'star-o'}
                className="Cards__item__buttons__favorite"
              />
              <FontAwesome 
                onClick={() => { this.handleRemoveCard(item.color, index) }} 
                name='trash-o'
                className="Cards__item__buttons__trash"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cards;
