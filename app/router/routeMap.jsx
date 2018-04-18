import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../containers/App';


export default class RouteMap extends React.Component{
    updateHandle(){
    }
    render(){
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={App}>
                </Route>
            </Router>
        )
    }
}
