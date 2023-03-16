import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Switch, Route } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import GroupCreateForm from "./pages/groups/GroupCreateForm";
import GroupPage from "./pages/groups/GroupPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/groups/create"
            render={() => <GroupCreateForm />}
          />
          <Route exact path="/groups/:id" render={() => <GroupPage />} />
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
