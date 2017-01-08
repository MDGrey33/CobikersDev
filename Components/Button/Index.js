import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

class Button extends Component{

    constructor(props){

        super(props);

    }

    onPress(){

        if(this.props.onPress){

            this.props.onPress();

        }

    }

    render(){

        return(
            <View style={this.props.style}>
                <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer} onPress={() => this.onPress()}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );

    }

}

var styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor:"#FF5E3A",
        width:100,
        height:100,
        borderRadius:50,
        justifyContent:"center",
    },
    text: {
        fontSize:15,
        backgroundColor:"transparent",
        color:"white",
        alignSelf:"center",
    }
});

module.exports = Button;