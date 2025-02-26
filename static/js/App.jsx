const { BrowserRouter, Route, Switch } = ReactRouterDOM;

const App = function() {
    return (
        <BrowserRouter>
            <div className="container py-4">
                <Switch>
                    <Route exact path="/" component={window.Form} />
                    <Route path="/confirmation" component={window.Confirmation} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));