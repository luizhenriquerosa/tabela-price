import { Switch, Route, Router as ReactRouter } from "react-router-dom";
import history from "./history";
import NewTable from "../pages/NewTable/index";
import ViewTable from "../pages/ViewTable/index";

const pages = [
  { path: "/resultado", exact: true, name: "ViewTable", render: ViewTable },
  {
    path: "/",
    name: "NewTable",
    render: NewTable,
  },
];

function Router({ children }) {
  return (
    <ReactRouter history={history}>
      <Switch>
        {pages.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            component={route.render}
          ></Route>
        ))}
      </Switch>
      {children}
    </ReactRouter>
  );
}

export default Router;
