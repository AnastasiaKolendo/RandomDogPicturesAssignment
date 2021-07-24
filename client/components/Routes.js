import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import SingleBreed from './SingleBreed';

const Routes = () => {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <Link id="link1" to="/">
                        Home
                    </Link>
                </nav>
                <main>
                    <Switch>
                        <Route exact path="/single_breed" component={SingleBreed} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default Routes;