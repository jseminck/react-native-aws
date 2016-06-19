import React from 'react';
import { View, TabBarIOS } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as githubActions from './awsActions';
import {onLogout} from './../Login/loginActions';
import routes from './../../scripts/routes';

import ServerList from './ServerList';

class TabsScreen extends React.Component {
    static propTypes = {
        state: React.PropTypes.object.isRequired,
        token: React.PropTypes.string,
        loggedIn: React.PropTypes.bool,
        navigator: React.PropTypes.object.isRequired,

        onLogout: React.PropTypes.func.isRequired,
        onDataLoad: React.PropTypes.func.isRequired,
        onToggleServer: React.PropTypes.func.isRequired,
        onTick: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.onDataLoad(this.props.token);
            this.timer = setInterval(this.props.onTick, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loggedIn !== nextProps.loggedIn && !nextProps.loggedIn) {
            let route = routes.getLoginRoute();
            this.props.navigator.replace(route);
        }
    }

    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title='Servers'
                    selected={true}
                    icon={require('./feed.png')}
                >
                    <View style={styles.view}>
                        <ServerList
                            navigator={this.props.navigator}
                            feed={this.props.state.feed}
                            countdown={this.props.state.countdown}
                            loading={this.props.state.loading}
                            onToggleServer={this.props.onToggleServer}
                        />
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title='Log out'
                    selected={false}
                    icon={require('./signout.png')}
                    onPress={::this.logout}
                >
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    logout() {
        this.props.onLogout();
    }

    changeTab(tab) {
        this.props.onChangeTab(tab);
    }
}

const styles = {
    view: {
        flex: 1
    }
};

function mapStateToProps(state) {
    return {
        state: state.aws,
        token: state.login.token,
        loggedIn: state.login.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(githubActions, {onLogout}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsScreen);

