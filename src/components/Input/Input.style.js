import { Dimensions, StyleSheet } from "react-native";
import colors from '../../styles/colors'

const base_style = StyleSheet.create({
    container:{
        padding:5,
        borderWidth:1,
        borderColor: colors.lightgray,
        borderRadius:5,
        color:"white",
    },
    
})

const deviceSize= Dimensions.get("window")

export default {
    primary: StyleSheet.create({
    container:{
        ...base_style.container,
        marginLeft:20,
        marginRight:20,
        margin:10,

    }}
    ),
    secondary: StyleSheet.create({
        container:{
            ...base_style.container,
            margin:10,
            marginLeft:80,
            marginRight:80
        }}
        ),
    thirdly: StyleSheet.create({
        container:{
            ...base_style.container,
            marginLeft:5,
            margin:10,
            padding:10,
            width:deviceSize.width/3-20,
            height: 50,
            borderRadius:15,
        }}
        ),
    alternative: StyleSheet.create({
        container:{
            ...base_style.container,
            color:"white",
            margin:10
        }}
    )
}