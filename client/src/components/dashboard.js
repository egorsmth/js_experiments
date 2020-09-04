import React from "react";

import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TableBody, TableContainer, TableHead, Paper, TableRow, TableCell, Box, Button, Container, Select, MenuItem, FormControl } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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
      user: users && users.length ? users[0].id : '',
      products,
      product: products && products.length ? products[0].id : '',
      quantity: 0,
      loading: false,
    })
  }

  handleChange(event) {
    event.preventDefault();

    const state = { ...this.state };
    state[event.target.name] = parseInt(event.target.value);
    this.setState(state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.state.user || !this.state.product || !this.state.quantity || !Number.isInteger(this.state.quantity))
      return;

    await createPurchase(this.state.user, this.state.product, this.state.quantity);
    const data = await dashboard();
    this.setState({
      ...this.state,
      data,
    })
  }

  render() {
    let data = [];
    if (!this.state.loading) {
      data = this.state.data.users.map(user => {
        return {
          name: user.name,
          purchases: user.products ? user.products.length : 0,
        }
      })
    }
    let chart;
    if (this.state.data.products) {
      chart = (<LineChart width={400} height={200} data={this.state.data.products.map(x => ({
        x: x.product.id,
        y: x.q,
        name: x.product.name,
      }))} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 50]} />
        <Tooltip />
      </LineChart>)
    }

    return (
      <Container maxWidth="lg">
        <Box m={1, 1, 1, 1}>
          <Button variant="contained">
            <Link to={config.routs.logout}>logout</Link>
          </Button>
        </Box>

        <Box m={1, 1, 1, 1}>
          <TableContainer component={Paper}>
            <TableHead>
              <TableCell>Name</TableCell>
              <TableCell align="right">Purchases</TableCell>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.purchases}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Box>

        <form onSubmit={this.handleSubmit}>
          <FormControl style={{
            margin: 1,
            minWidth: 120,
          }}>
            <Select
              labelId="demo-simple-select-label"
              name="user"
              onChange={this.handleChange}
            >
              {this.state.users.map(user => (<MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>))}
            </Select>

            <Select
              labelId="demo-simple-select-label"
              name="product"
              onChange={this.handleChange}
            >
              {this.state.products.map(product => (<MenuItem key={product.id} value={product.id}>{product.name} - {product.price} $</MenuItem>))}
            </Select>
            <Button type="submit" variant="contained">Add</Button>
          </FormControl>
        </form>
        <Box m={1, 1, 1, 1}>
          {chart}
        </Box>
      </Container>
    );
  }
}

export default Dashboard;