import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Forecast extends Component {
    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp}°C
                </Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 3,
        color: '#FFFFFF'
   },
    mainText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF'
    }
});

export default Forecast;

