import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import DeviceInfo from 'react-native-device-info';
import {colors, styles} from "./styles";


class Info extends React.PureComponent {
    static navigationOptions = {
        title: 'Info',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.productAttr}>App name:</Text>
                    <Text style={styles.productAbout}>{DeviceInfo.getApplicationName()}</Text>
                    <Text style={styles.productAttr}>Version:</Text>
                    <Text style={styles.productAbout}>{DeviceInfo.getReadableVersion()}</Text>
                </View>
                <View style={styles.containerProduct}>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <Text style={[styles.btn, colors.btn.active]}>Go back</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

export default Info;
