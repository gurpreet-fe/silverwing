import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default class CreateRoom extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      successMessage: "",
      errorMessage: "",
    };

    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleCreateRoomButtonClick = this.handleCreateRoomButtonClick.bind(
      this
    );
    this.handleUpdateRoomButtonClick = this.handleUpdateRoomButtonClick.bind(
      this
    );
    /* this.renderCreateButton = this.renderCreateButton.bind(this);
    this.renderUpdateButton = this.renderUpdateButton.bind(this); */
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleCreateRoomButtonClick() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  handleUpdateRoomButtonClick() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({
          successMessage: "Room updated successfully!",
        });
      } else {
        this.setState({
          errorMessage: "Error updating room...",
        });
      }

      this.props.updateCallback();
    });
  }

  renderCreateButton() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Button
            color='primary'
            variant='contained'
            onClick={this.handleCreateRoomButtonClick}
          >
            Create Room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button color='secondary' variant='contained' to='/' component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderUpdateButton() {
    return (
      <Grid item xs={12} align='center'>
        <Button
          color='primary'
          variant='contained'
          onClick={this.handleUpdateRoomButtonClick}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  render() {
    const title = this.props.update ? "Update Room" : "Create Room";

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Collapse
            in={
              this.state.errorMessage != "" || this.state.successMessage != ""
            }
          >
            {this.state.successMessage != "" ? (
              <Alert
                severity='success'
                onClose={() => {
                  this.setState({ successMessage: "" });
                }}
              >
                {this.state.successMessage}
              </Alert>
            ) : (
              <Alert
                severity='error'
                onClose={() => {
                  this.setState({ errorMessage: "" });
                }}
              >
                {this.state.errorMessage}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography component='h4' variant='h4'>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <FormControl component='fieldset'>
            <FormHelperText>
              <div align='center'> Guest control of Playback State </div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue='true'
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value={this.props.guestCanPause.toString()}
                control={<Radio color='primary' />}
                label='Play/Pause'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='false'
                control={<Radio color='secondary' />}
                label='No Control'
                labelPlacement='bottom'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align='center'>
          <FormControl>
            <TextField
              required={true}
              type='number'
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align='center'>Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update
          ? this.renderUpdateButton()
          : this.renderCreateButton()}
      </Grid>
    );
  }
}
