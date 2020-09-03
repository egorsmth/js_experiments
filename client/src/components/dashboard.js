import React from "react";

import { Link } from "react-router-dom";

import config from "../config"
import { dashboard, getUsers, getProducts, createPurchase } from '../services/dashboard'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
      users: [],
      products: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const data = await dashboard();
    const users = await getUsers() || [];
    const products = await getProducts() || [];
    if (!data) {
      this.props.history.push(config.routs.logout);
      window.location.reload();
    }
    this.setState({
      data,
      users,
      user: '',
      products,
      product: '',
      quantity: 0,
      loading: false,
    })
  }

  handleChange(event) {
    event.preventDefault();

    const state = { ...this.state };
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async handleSubmit(event) {
    event.preventDefault();

    await createPurchase(this.state.user, this.state.product, this.state.quantity);
    const data = await dashboard();
    this.setState({
      ...this.state,
      data,
    })
  }

  render() {
    let data;
    if (this.state.loading) {
      data = <img src={process.env.PUBLIC_URL + '/loading.gif'} width='60' height='50' />
    } else {
      data = <div>
        {this.state.data.map(x => x.name)}
      </div>
    }

    let usersSelect = [];
    let productSelect = [];
    for (let user of this.state.users) {
      usersSelect.push(<option value={user.id}>{user.name}</option>);
    }
    for (let product of this.state.products) {
      productSelect.push(<option value={product.id}>{product.name} - {product.price} $</option>);
    }

    return (
      <div>
        <Link to={config.routs.logout}>logout</Link>
        This is Dashboard
        {data}

        <form onSubmit={this.handleSubmit}>
          <select name="user" onChange={this.handleChange}>
            {usersSelect}
          </select>
          <select name="product" onChange={this.handleChange}>
            {productSelect}
          </select>
          <input name="quantity" type="text" onChange={this.handleChange}></input>
          <input type="submit" value="Add"></input>
        </form>
      </div>
    );
  }
}

export default Dashboard;