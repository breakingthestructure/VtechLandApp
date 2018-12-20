import React, { Component } from 'react';
import { createAppContainer, createMaterialTopTabNavigator, TabBarBottom } from 'react-navigation';
import Home from './components/screens/Home/Home';
import ListNews from './components/screens/News/ListNews';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

const Tab = createAppContainer(createMaterialTopTabNavigator(
    {
        Home: { screen: Home },
        Settings: { screen: ListNews },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: true,
    }
));

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
        console.log('123');
    }

    render() {
        return (
            <Tab />
        );
    }
}

