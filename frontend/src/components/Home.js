import React, { Component } from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import { Button, Grid, Typography, ButtonGroup, Link } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align='center'>
          <Typography variant='h2' compact='h2'>
            Silver-Wing
          </Typography>
        </Grid>

        <Grid item xs={12} align='center'>
          <ButtonGroup disableElevation variant='contained' color='primary'>
            <Button color='primary' to='/join' component={Link}>
              Join a Room
            </Button>
            <Button color='secondary' to='/create' component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            {this.renderHomePage()}
          </Route>
          <Route path='/join' component={JoinRoom} />
          <Route path='/create' component={CreateRoom} />
          <Route path='/room/:roomCode' component={Room} />
        </Switch>
      </Router>
    );
  }
}
