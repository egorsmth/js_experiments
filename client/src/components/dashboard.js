import React from "react";

import { Link } from "react-router-dom";

import config from "../config"
import { dashboard } from '../services/dashboard'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await dashboard();
    if (!data) {
      this.props.history.push(config.routs.logout);
      window.location.reload();
    }
    this.setState({
      data,
      loading: false,
    })
  }

  render() {
    let data;
    if (this.state.loading) {
      data = <img src={process.env.PUBLIC_URL + '/loading.gif'} width='60' height='50' />
    } else {
      data = <div>
        {this.state.data}
      </div>
    }
    return (
      <div>
        <Link to={config.routs.logout}>logout</Link>
        This is Dashboard
        {data}
      </div>
    );
  }
}

export default Dashboard;