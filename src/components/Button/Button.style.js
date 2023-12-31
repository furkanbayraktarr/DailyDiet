import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const base_style = StyleSheet.create({
    container:{
        padding:8,
        borderRadius:10,
        margin:10,
        marginLeft:15,
        marginRight:15,
        alignItems:"center"
    }
})

export default{ 
    primary: StyleSheet.create({
    container:{
    ...base_style.container,
        backgroundColor:colors.green,
    },
    title:{
        color:"white",
    }
}),
secondary: StyleSheet.create({
    container:{
    ...base_style.container,
        backgroundColor:"white",
    },
    title:{
        color:colors.green,
    }
}),
thirdly: StyleSheet.create({
    container:{
        backgroundColor:colors.green,
        borderRadius:20,
        padding:5,
        alignSelf:"center",
        alignItems:"center",
        width:50,
        height:25
    },
    title:{
        color:"white",
        fontSize:11,
    }
})}

