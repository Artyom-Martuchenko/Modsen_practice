import './BigCard.css';

export function BigCard() {
  return (
    <div className="big_cards_main">
      <div className="big_cards_photo"></div>
      <div id="big_cards_group">
        <div>
          <div className="big_cards_div">
            <div className="big_cards_attributes"></div>
            <div className="big_cards_attributes"></div>
          </div>
          <h2>Name</h2>
          <h4>description</h4>
        </div>
        <div id="big_cards_group_buttons">
          <button>Сохранено</button>
          <button>Маршрут</button>
        </div>
      </div>
    </div>
  );
}
