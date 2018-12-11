import React from "react";
import {TouchableOpacity, Text, View, TextInput, ToastAndroid} from "react-native";
import axios from "axios";
import {colors, styles} from './styles';


class Home extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            disabled: true,
        };
    }

    formEdit = (value) => {
        this.setState(value, () => {
            this.setState({
                disabled: !(this.state.email && this.state.password),
            });
        });
    };

    onLogin = () => {
        const login = 'http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token';
        axios.post(login, {
            username: this.state.email,
            password: this.state.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const {navigate} = this.props.navigation;
            ToastAndroid.show(`Hello, ${this.state.email}`, ToastAndroid.SHORT);
            navigate('Products');
        }).catch((error) => {
            ToastAndroid.show(`you have some problem. Try again!`, ToastAndroid.LONG);
        });
    };

    checkLogin = () => !this.state.email && !this.state.password;

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Friday's shop</Text>
                <TextInput
                    placeholder={'email'}
                    style={styles.input}
                    onChangeText={(text) => this.formEdit({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    placeholder={'password'}
                    style={styles.input}
                    secureTextEntry
                    textContentType={'password'}
                    onChangeText={(text) => this.formEdit({password: text})}
                    value={this.state.password}
                />
                <TouchableOpacity disabled={this.state.disabled} onPress={() => this.onLogin()}>
                    <Text
                        style={[styles.btn, colors.btn[this.state.disabled ? 'disabled' : 'active']]}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Home;
