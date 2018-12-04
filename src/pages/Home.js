import React from "react";
import {TouchableOpacity, Text, View, TextInput} from "react-native";
import {colors, styles} from './styles';


class Home extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        fontFamily: 'vincHand',
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

    checkLogin = () => !this.state.email && !this.state.password;

    render() {
        const {navigate} = this.props.navigation;
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
                    onChangeText={(text) => this.formEdit({password: text})}
                    value={this.state.password}
                />
                <TouchableOpacity disabled={this.state.disabled} onPress={() => navigate('Products')}>
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
