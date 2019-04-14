import React from "react";
import Grid from "@material-ui/core/Grid";

import Navbar from "./Navbar";
import Todolist from "./Todolist";

const App = () => (
  <Grid container direction="column">
    <Grid item xs>
      <Navbar />
    </Grid>
    <Grid item xs>
      <Todolist />
    </Grid>
  </Grid>
);

export default App;
