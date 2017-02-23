import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Alert,
} from 'react-native';

import Forecast from './Forecast';

const API_KEY = '6591208aadcdedfa3e189641d1cd8eb2';

class WeatherProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city:'',
            forecast: null,
        };

    }
    _handleTextChange = (event) => {
        var city = event.nativeEvent.text;
        this.setState({city: city});
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=' + API_KEY)
            .then((response) => response.json())
            .then((responseJSON) => {
            console.log(responseJSON);
                this.setState({
                    forecast: {
                        main: responseJSON.weather[0].main,
                        city: responseJSON.name,
                        description: responseJSON.weather[0].description,
                        temp: responseJSON.main.temp
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('정확한 값을 입력하세요', 'ex. Seoul');
            });
    };

    render() {
        var content = null;
        if(this.state.forecast !== null) {
            content = <Forecast main={this.state.forecast.main} description={this.state.forecast.description} temp={this.state.forecast.temp} />;
        }
        return (
            <View style={styles.container}>
                <Image source={require('./image/ice.jpg')}
                       resizeMode='cover'
                       style={styles.backdrop}>
                    <View style={styles.overlay}>
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                Current weather for
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput style={[styles.zipCode, styles.mainText]} onSubmitEditing={(event) => this._handleTextChange(event)} />
                            </View>
                        </View>
                        {content}
                    </View>
                </Image>
            </View>
        );
    }
}

const baseFontSize = 16;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column'
    },
    overlay: {
        paddingTop: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        padding: 30
    },
    zipContainer: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3
    },
    zipCode: {
        width: 80,
        padding: 0,
        height: baseFontSize
    },
    mainText: {
        fontSize: baseFontSize,
        color: '#DDDDDD',
        fontWeight: 'bold'
    },
});

export default WeatherProject;