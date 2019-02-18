import React from 'react';
import {
    TouchableOpacity, Text, View, TextInput, ToastAndroid, Modal, TouchableHighlight,
    LayoutAnimation, UIManager, NetInfo, Vibration, AsyncStorage
} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {colors, styles, modalStyle} from './styles';
import {Button} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';

class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {navigate} = navigation;
        return {
            title: 'Login',
            headerRight: (
                <Button
                    onPress={() => navigate('Info')}
                    title="Info"
                    color="#fff"
                />
            ),
        };
    }

    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental(true);
        this.state = {
            email: '',
            password: '',
            disabled: true,
            showError: false,
            modalVisible: false,
        };
    }

    formEdit = (value) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.setState(value, () => {
            this.setState({
                disabled: !(this.state.email && this.state.password),
            });
        });
    };

    onLogin = () => {
        this.setState({showError: false, load: true});
        const login = 'http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token';

        axios.post(login, {
            username: this.state.email,
            password: this.state.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const {navigation: {navigate}} = this.props;
            const {data} = response;
            this.setModalVisible(false);
            ToastAndroid.show(`Hello, ${this.state.email}`, ToastAndroid.SHORT);
            this.setState({load: false});

            AsyncStorage.setItem('user_email', this.state.email);
            AsyncStorage.setItem('user_password', this.state.password);
            AsyncStorage.setItem('user_token', data);
            navigate('Products');
        }).catch((error) => {
            // this.setModalVisible(true);
            this.setState({load: false});
            ToastAndroid.show(`Try again!`, ToastAndroid.LONG);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({showError: true});
        });
    };


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount(): void {
        SplashScreen.hide();

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                ToastAndroid.show('Check your internet connection!');
                Vibration.vibrate(500);
            }
        });

        const {navigation: {navigate}} = this.props;

        // AsyncStorage.getItem('user_token').then(user_token => user_token !== null && navigate('Products'))
        //     .catch((error) => console.error(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent
                    onRequestClose={() => {
                    }}
                    visible={this.state.modalVisible}
                >
                    <View style={modalStyle.container}>
                        <View style={modalStyle.body}>
                            <Text style={modalStyle.message}>Login failed! Try again</Text>

                            <View style={modalStyle.actionList}>
                                <TouchableHighlight
                                    style={modalStyle.action}
                                    onPress={() => this.onLogin()}
                                >
                                    <Text style={modalStyle.actionLabel}>Try again</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={modalStyle.action}
                                    onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                >
                                    <Text style={modalStyle.actionLabel}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                </Modal>

                <Text style={styles.title}>Friday's shop</Text>

                <TextInput
                    placeholder={'email'}
                    style={[styles.input, this.state.showError && styles.inputError]}
                    onChangeText={(text) => this.formEdit({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    placeholder={'password'}
                    style={[styles.input, this.state.showError && styles.inputError]}
                    secureTextEntry
                    textContentType={'password'}
                    onChangeText={(text) => this.formEdit({password: text})}
                    value={this.state.password}
                />
                {this.state.showError && <Text style={styles.error}>Check you email or password</Text>}

                {!this.state.load ? <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onLogin()}>
                    <Text style={[styles.btn, colors.btn[this.state.disabled ? 'disabled' : 'active']]}>
                        Login
                    </Text>
                </TouchableOpacity> : <LottieView
                    source={require('../animation/loader.json')}
                    autoPlay
                    loop
                />}

            </View>
        );
    }
}

export default Home;
