import React from "react";
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from "react-native";


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
            console.log(this.state);
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

const colors = {
    btn: {
        active: {
            backgroundColor: '#004dcf',
            color: '#fff',
        },
        disabled: {
            backgroundColor: '#ccc',
            color: '#fff',
        },
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 55,
        textAlign: 'center',
        color: '#555555',
        fontFamily: 'vincHand',
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#FBFBFB",
        borderColor: '#697689',
        color: '#555555',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        fontSize: 20,
        fontFamily: 'vincHand',
    },
    btn: {
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 25,
        borderRadius: 5,
        fontFamily: 'vincHand',
    }
});

export default Home;
