import React from "react";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MoreIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import { AddTodo } from "../redux/crud/todoAction";
import filterd from "../redux/filterd";
import { completeFilter } from "../redux/filter/filterAction";

import { connect } from "react-redux";

import {
  Modal,
  Paper,
  TextField,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Menu
} from "@material-ui/core";

class Navbar extends React.Component {
  state = {
    modalOpen: false,
    menuOpen: false,
    todo: {
      title: "",
      desc: ""
    },
    completed: false,
    filterCheckbox: this.props.filter.completed,
    error: ""
  };

  handleFilterCheckbox = () => {
    this.setState({ filterCheckbox: true, menuOpen: false });
    this.props.dispatch(completeFilter());
    filterd(this.props.todos, this.props.filter);
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  };

  handleMenuOpen = () => {
    this.setState({ menuOpen: true });
  };

  handleModalClose = () => {
    this.setState({
      error: "",
      modalOpen: false,
      completed: false,
      todo: { title: "", desc: "" }
    });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleCheckBox = () => {
    this.setState({ completed: true });
  };

  handleChangeTodo = e => {
    const change = this.state.todo;
    change[e.target.name] = e.target.value;

    this.setState({ todo: change });
  };

  handleSubmit = () => {
    if (this.state.todo.title) {
      this.props.dispatch(
        AddTodo({
          title: this.state.todo.title,
          desc: this.state.todo.desc,
          completed: this.state.completed
        })
      );
      this.setState({
        modalOpen: false,
        error: "",
        completed: false,
        todo: { title: "", desc: "" }
      });
    } else {
      this.setState({ error: "Title is Required" });
    }
  };

  render() {
    return (
      <AppBar position="static" color="secondary" style={{ padding: 10 }}>
        <Toolbar>
          <Typography color="inherit" variant="h4">
            Your2DUS
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Fab
            style={{ backgroundColor: "white" }}
            size="medium"
            variant="extended"
            onClick={this.handleModalOpen}
          >
            <AddIcon color="secondary" style={{ marginRight: 5 }} />
            <Typography color="secondary" variant="title">
              Add
            </Typography>
          </Fab>
          <IconButton
            style={{ margin: "0 -10px 0 10px" }}
            size="medium"
            color="inherit"
            onClick={this.handleMenuOpen}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            open={this.state.menuOpen}
            onClose={this.handleMenuClose}
            style={{
              position: "absolute",
              left: "75%"
            }}
          >
            <MenuItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.filterCheckbox}
                    onChange={this.handleFilterCheckbox}
                  />
                }
                label="COMPLETED"
              />
            </MenuItem>
          </Menu>
          <Modal open={this.state.modalOpen} onClose={this.handleModalClose}>
            <Paper
              style={{
                textAlign: "center",
                padding: "50px 20px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            >
              <Typography variant="h5" color="secondary">
                ADD TODO
              </Typography>
              <form>
                <TextField
                  label="Title"
                  value={this.state.todo.title}
                  onChange={this.handleChangeTodo}
                  margin="normal"
                  required
                  fullWidth
                  name="title"
                />
                <TextField
                  label="Description"
                  value={this.state.todo.desc}
                  onChange={this.handleChangeTodo}
                  margin="normal"
                  fullWidth
                  name="desc"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.completed}
                      onChange={this.handleCheckBox}
                      name="completed"
                    />
                  }
                  label="completed"
                />
                <Divider />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  style={{
                    width: "40%",
                    margin: 10,
                    marginTop: 30
                  }}
                  onClick={this.handleSubmit}
                >
                  SUBMIT
                </Button>
                <Button
                  onClick={this.handleModalClose}
                  variant="outlined"
                  size="large"
                  style={{
                    width: "40%",
                    margin: 10,
                    marginTop: 30
                  }}
                >
                  cencel
                </Button>
              </form>
              {this.state.error && (
                <Typography variant="h6" color="error">
                  {this.state.error}
                </Typography>
              )}
            </Paper>
          </Modal>
        </Toolbar>
      </AppBar>
    );
  }
}

const mstp = state => ({
  todos: state.todoReducer,
  filter: state.filterReducer
});

export default connect(mstp)(Navbar);
