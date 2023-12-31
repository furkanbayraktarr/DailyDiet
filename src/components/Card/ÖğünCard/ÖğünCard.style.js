import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const base_style = StyleSheet.create({
    container:{
        padding:2,
        flexDirection:"row",
        width:Dimensions.get("window").width,
        borderBottomWidth:1,
        borderBottomColor:colors.slategray
    },
    title:{
        padding:5,
        fontSize:18,
        color:"yellow",
        marginLeft:2,
        
    },
    inner_container:{
        flexDirection:"row",
        justifyContent:"space-around",
        flex:3,
        marginRight:2
    },
    besin:{
        color:"white",
        textAlignVertical:"center",
        padding:10,
        marginLeft:2,
        marginRight:2,
        
    },
    besin_kcal:{
        color:"white",
        textAlignVertical:"center",
        padding:10,
        marginLeft:65,
        marginRight:2,
    },
    upper_container:{
        padding:3,
        flex:3
    },
})
export default{ 
    primary: StyleSheet.create({
        ...base_style
    }),
    secondary: StyleSheet.create({
    ...base_style,
    title:{
    ...base_style.title,
    color:colors.limegreen,
    fontWeight:"bold"
    },
}),
}