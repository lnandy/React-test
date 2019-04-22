/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from '../container/Loading'
import Main from '../container/Main'
import DailyInsert from '../container/DailyInsert'
import Footer from '../container/Footer'
import CustomMenu from '../common/CustomMenu'
import SlideWidget from '../container/SlideWidget'
 
const Root = () => (
    <Switch>
        <Route
        path="/"
        render={props => (
            <Switch>
                <Route path="/" exact component={Loading} />
                <React.Fragment>
                    <CustomMenu history={props.history}/>
                    <SlideWidget />
                    <Footer color="#00b0da"/>
                    <Route path="/app/list" component={Main}  history={props.history}/>
                    <Route path="/app/dailyInsert" component={DailyInsert}  history={props.history}/>
                </React.Fragment>
                <React.Fragment>
                    <Footer />
                </React.Fragment>
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        )}
        />
    </Switch>
);
export default Root;