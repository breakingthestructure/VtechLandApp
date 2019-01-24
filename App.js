import React from 'react';
import {
    Alert,
    Animated,
    Easing,
    ImageBackground,
    NetInfo,
    View,
    Platform
} from 'react-native';
import {
    Root,
    Toast
} from 'native-base';
import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
    DrawerActions
} from 'react-navigation';
import type {
    Notification,
    NotificationOpen
} from 'react-native-firebase';
import firebase from 'react-native-firebase';
import KeyboardManager from 'react-native-keyboard-manager';
import Login from './components/screens/Auth/Login';
import Menu from './components/screens/Auth/Menu';
import RightMenu from './components/screens/Auth/RightMenu';
import Home from './components/screens/Home/Home';
import MapProject from './components/screens/Project/MapProject';
import ListNews from './components/screens/News/ListNews';
import DetailNews from './components/screens/News/DetailNews';
import Config from './components/screens/Auth/Config';
import TablePackage from './components/screens/Project/TablePackage';
import DetailApartment from './components/screens/Project/DetailApartment';
import MyNotification from './components/screens/Auth/MyNotification';
import Profile from './components/screens/Auth/Profile';
import imgWelcome from './icons/welcome.jpg';
import OrderSubmit from './components/screens/Transaction/OrderSubmit';
import MyCustomers from './components/screens/Auth/MyCustomers';
import MyTransactions from './components/screens/Auth/MyTransactions';
import DetailTransaction from './components/screens/Transaction/DetailTransaction';
import MyProject from './components/screens/Auth/MyProject';
import ChangePassword from './components/screens/Auth/ChangePassword';
import DetailCustomer from './components/screens/Customer/DetailCustomer';
import Register from './components/screens/Auth/Register';
import ForgotPassword from './components/screens/Auth/ForgotPassword';
import ResetPassword from './components/screens/Auth/ResetPassword';
import Building from './components/screens/Project/Building';
import SearchApartment from './components/screens/Project/SearchApartment';
import ResultApartment from './components/screens/Project/ResultApartment';
import ListQuestion from './components/screens/Option/ListQuestion';
import Privacy from './components/screens/Option/Privacy';
import AllBuilding from './components/screens/Project/AllBuilding';
import ListPartner from './components/screens/Option/ListPartner';
import DetailPartner from './components/screens/Option/DetailPartner';
import CategoryPartner from './components/screens/Option/CategoryPartner';
import Test from './Test';
import MainProject from './components/screens/Project/MainProject';
import MapNew from './components/screens/Project/MapNew';
import Autocomplete from './components/Autocomplete';

console.disableYellowBox = true;

if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    KeyboardManager.setPreventShowingBottomBlankSpace(true);
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setToolbarDoneBarButtonItemText('Done');
    KeyboardManager.setToolbarManageBehaviour(0);
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
    KeyboardManager.setShouldShowTextFieldPlaceholder(true);
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.resignFirstResponder();
}

const ProjectStack = createStackNavigator(
    {
        MapScreen: {
            screen: MapNew
        },
        BuildingScreen: {
            screen: Building
        },
        TabProjectScreen: {
            screen: MainProject
        },
        TablePackageScreen: {
            screen: TablePackage
        },
        SearchApartmentScreen: {
            screen: SearchApartment
        },
        ResultApartmentScreen: {
            screen: ResultApartment
        },
        DetailApartmentScreen: {
            screen: DetailApartment
        },
        OrderSubmitScreen: {
            screen: OrderSubmit
        },
    },
    {
        headerMode: 'none',
        // mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

const PartnerStack = createStackNavigator(
    {
        CategoryPartnerScreen: {
            screen: CategoryPartner
        },
        ListPartnerScreen: {
            screen: ListPartner
        },
        DetailPartnerScreen: {
            screen: DetailPartner
        },
    },
    {
        headerMode: 'none',
        // mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

const LeftDrawer = createDrawerNavigator(
    {
        HomeScreen: {
            screen: Home
        },
        MapScreen: {
            screen: ProjectStack
        },
        NewsScreen: {
            screen: ListNews
        },
        DetailNewsScreen: {
            screen: DetailNews
        },
        LoginScreen: {
            screen: Login
        },
        RegisterScreen: {
            screen: Register
        },
        ForgotPasswordScreen: {
            screen: ForgotPassword
        },
        ResetPasswordScreen: {
            screen: ResetPassword
        },
        QuestionScreen: {
            screen: ListQuestion
        },
        PrivacyScreen: {
            screen: Privacy
        },
        AllBuildingScreen: {
            screen: AllBuilding
        },
        PartnerScreen: {
            screen: PartnerStack
        },
        TestScreen: {
            screen: Autocomplete
        },
        Autocomplete: {
            screen: Autocomplete
        },
    },
    {
        initialRouteName: 'MapScreen',
        contentComponent: Menu,
        getCustomActionCreators: (route, stateKey) => {
            return {
                toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
            };
        },
    }
);

const UserStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: Profile
        },
        ChangePasswordScreen: {
            screen: ChangePassword
        },
        NotificationScreen: {
            screen: MyNotification
        },
        MyProjectScreen: {
            screen: MyProject
        },
        ConfigScreen: {
            screen: Config
        }
    },
    {
        headerMode: 'none',
        // mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

const CustomerStack = createStackNavigator(
    {
        MyCustomerScreen: {
            screen: MyCustomers
        },
        DetailCustomerScreen: {
            screen: DetailCustomer
        },
    },
    {
        headerMode: 'none',
        // mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

const TransactionStack = createStackNavigator(
    {
        MyTransactionScreen: {
            screen: MyTransactions
        },
        DetailTransactionScreen: {
            screen: DetailTransaction
        },
    },
    {
        headerMode: 'none',
        // mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

const RightDrawer = createDrawerNavigator({
        Left: {
            screen: LeftDrawer,
        },
        User: {
            screen: UserStack,
        },
        Customer: {
            screen: CustomerStack
        },
        Transaction: {
            screen: TransactionStack
        }
    }, {
        contentComponent: RightMenu,
        drawerPosition: 'right',
        getCustomActionCreators: (route, stateKey) => {
            return {
                toggleRightDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
            };
        },
    }
);

const AppContainer = createAppContainer(RightDrawer);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    async componentDidMount() {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                return Toast.show({
                    text: 'Thiết bị của bạn không có kết nối internet. Vui lòng mở kết nối trước khi sử dụng!',
                    buttonText: 'Xác nhận',
                    type: 'warning',
                });
                // Alert.alert(
                //     'Thông báo',
                //     'Thiết bị của bạn không có kết nối internet. Vui lòng mở kết nối trước khi sử dụng',
                //     [
                //         { text: 'OK', onPress: () => BackHandler.exitApp() },
                //     ],
                //     { cancelable: false }
                // );
                // return false;
            }
            // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        });

        function handleFirstConnectivityChange(connectionInfo) {
            // console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            NetInfo.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }

        NetInfo.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1000);
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
            var seen = [];
            // alert(JSON.stringify(notification.data, function (key, val) {
            //   if (val != null && typeof val == "object") {
            //     if (seen.indexOf(val) >= 0) {
            //       return;
            //     }
            //     seen.push(val);
            //   }
            //   return val;
            // }));
        }
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
        // Create the channel
        firebase.notifications().android.createChannel(channel);
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);
        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            // const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            Alert.alert(
                notification.title,
                notification.body
            );
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        });
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    render() {
        if (this.state.loaded) {
            return (
                <Root>
                    <AppContainer />
                </Root>
            );
        }
        return (
            <View>
                <ImageBackground source={imgWelcome} style={{ width: '100%', height: '100%' }} />
            </View>
        );
    }
}
