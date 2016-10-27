import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TOuchableOpacity,
} from 'react-native';

class Button extends Component{

    constructor(props){

        super(props);

    }

    render(){

        return(
            <View style={styles.content}>
                <Text>Button</Text>
            </View>
        );

    }

}

var styles = StyleSheet.create({
    content: {
        
    }
});

module.exports = Button;