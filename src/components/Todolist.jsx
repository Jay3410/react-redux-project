import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  Paper,
  Typography,
  IconButton,
  Modal,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  TextField
} from "@material-ui/core";
import { Delete, Create } from "@material-ui/icons";
import { connect } from "react-redux";

import { deleteTodo, updateTodo } from "../redux/crud/todoAction";

class Todolist extends React.Component {
  state = {
    modalOpen: false,
    todo: {
      title: "",
      desc: ""
    },
    completed: false,
    error: "",
    id: null
  };

  handleChangeTodo = e => {
    const change = this.state.todo;
    change[e.target.name] = e.target.value;

    this.setState({ todo: change });
  };

  handleModalClose = () => {
    this.setState({
      error: "",
      modalOpen: false,
      completed: false,
      todo: { title: "", desc: "" },
      id: null
    });
  };

  handleModalOpen = ({ id, completed, title, desc }) => () => {
    this.setState({ modalOpen: true, id, completed, todo: { title, desc } });
  };

  handleCheckBox = () => {
    this.setState({ completed: true ? false : true });
  };

  handleSubmit = () => {
    if (this.state.todo.title) {
      this.props.dispatch(
        updateTodo({
          title: this.state.todo.title,
          desc: this.state.todo.desc,
          completed: this.state.completed,
          id: this.state.id
        })
      );
      this.setState({
        modalOpen: false,
        error: "",
        completed: false,
        todo: { title: "", desc: "" },
        id: null
      });
    } else {
      this.setState({ error: "Title is Required" });
    }
  };

  handleDelete = id => () => {
    this.props.dispatch(deleteTodo(id));
  };

  render() {
    return (
      <Grid
        container
        direction="column"
        style={{
          padding: 20
        }}
      >
        <Grid item container>
          {this.props.todos ? (
            this.props.todos.map(todo => {
              return (
                <Paper
                  key={todo.id}
                  style={{
                    width: "100%",
                    margin: "0 auto",
                    padding: "15px 25px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 15
                  }}
                >
                  <Typography variant="h4" color="secondary">
                    {todo.title}
                  </Typography>
                  <div style={{ margin: "auto" }} />
                  <IconButton
                    color="secondary"
                    onClick={this.handleModalOpen(todo)}
                  >
                    <Create />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={this.handleDelete(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </Paper>
              );
            })
          ) : (
            <h2>Add some Todos</h2>
          )}
        </Grid>
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
                  />
                }
                label="COMPLETED"
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
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todoReducer
});

export default connect(mapStateToProps)(Todolist);
