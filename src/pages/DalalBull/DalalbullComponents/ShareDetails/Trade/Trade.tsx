import React, { useState , FunctionComponent } from 'react';
import './Trade.scss';

export function TradeProps(type:any) {
  const [pendingDisabled, setPendingDisabled] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  return {
    type,
    quantity,
    setQuantity,
    pendingDisabled,
    setPendingDisabled,
    price,
    setPrice,
  };
}

type Props = {
  current_price : number,
  setBase : (arg:any) => any,
  total_transactions : any,
  setBrokerage : (arg:any) => any,
  setTotal : (arg:any) => any,
  quantity: any,
  setQuantity : (arg:any) => any,
  setPendingDisabled : (arg:any) => any,
  pendingDisabled:any,
  type:any,
  price :any,
  setPrice : (arg : any) => any

}

const Trade : FunctionComponent<Props> = props => {
  const updateValues = (quantity:number) => {
    const bv = props.current_price * quantity;
    props.setBase(bv.toFixed(2));
    let brokerage_perc = 0.5;
    if (props.total_transactions > 100 && props.total_transactions < 1000)
      brokerage_perc = 0.5;
    else if (props.total_transactions >= 1000) brokerage_perc = 1.5;
    const brk = (brokerage_perc / 100) * (props.current_price * quantity);
    props.setBrokerage(brk.toFixed(2));
    props.setTotal((bv + brk).toFixed(2));
  };
  return (
    <div className="Trade">
      <div className="d-flex p-4">
        <div className="button">
          <button
            type="button"
            className="btn increment-button"
            onClick={() => {
              if (props.quantity > 0) {
                props.setQuantity(props.quantity - 1);
                updateValues(props.quantity - 1);
              }
            }}
          >
            <i className="fa fa-minus" />
          </button>
        </div>
        <div className="align-middle">
          <input
            type="number"
            name="quantity"
            id="quantity-input"
            className="quantity-input text-center"
            placeholder="Quantity"
            value={props.quantity}
            onChange={e => {
              let qty = parseInt(e.target.value, 10);
              qty = isNaN(qty) ? 0.0 : qty;
              updateValues(qty);
              props.setQuantity(qty);
            }}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn increment-button"
            onClick={() => {
              props.setQuantity(props.quantity + 1);
              updateValues(props.quantity + 1);
            }}
          >
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>

      <br />
      <span className="pending">
        <input
          type="checkbox"
          id="pending"
          onChange={() => props.setPendingDisabled(!props.pendingDisabled)}
        />
        <label htmlFor="pending" style={{fontSize:"0.9em"}} className="ml-2">
          Pending
        </label>
        <br />
        <div className={props.pendingDisabled.toString()}>
          <div className="small">
            <span className="pending small">
              {props.type} THE STOCK ONLY WHEN IT REACHES
            </span>
          </div>
          <div className="d-flex" id="pending_block">
            <div>
              <input
                type="number"
                name="quantity"
                id="quantity-input"
                className="quantity-input text-center"
                placeholder="Price"
                disabled={props.pendingDisabled}
                value={props.price}
                onChange={e => props.setPrice(parseInt(e.target.value, 10))}
              />
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Trade;
