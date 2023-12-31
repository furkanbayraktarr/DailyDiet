import React from "react";
import { SafeAreaView, TextInput } from "react-native";
import styles from './Input.style'


function Input({placeholder,value,onType,isSecure,placeholderTextColor,theme="primary"}){
    return(
        <SafeAreaView style={styles.outer_container}>
            <TextInput
            style={styles[theme].container}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={isSecure}
            value={value}
            onChangeText={onType}
            />
            </SafeAreaView>
    )
}

export default Input