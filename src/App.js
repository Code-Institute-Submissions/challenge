import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <h1>Sign In</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign Up</h1>} />
          <Route
            render={() => (
              <>
                <h1>Page Not Found</h1>
                <p>Your off the paths, get back on!</p>
              </>
            )}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
