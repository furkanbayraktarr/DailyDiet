import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    container:{
        padding:2,
        flexDirection:"row",
        width:Dimensions.get("window").width,
        borderBottomWidth:1,
        borderColor:colors.slategray
    },
    title:{
        padding:5,
        fontSize:15,
        color:"white",
        marginLeft:2,
    },
    inner_container:{
        flexDirection:"row",
        justifyContent:"space-around",
        flex:3,
        marginRight:0
    },
    besin:{
        color:"white",
        textAlignVertical:"center",
        padding:10,
        marginLeft:2,
        marginRight:2,
        textAlignVertical:"center",
    },
    besin_kcal:{
        color:"white",
        padding:10,
        marginLeft:65,
        marginRight:2,
        textAlignVertical:"center",
    },
    upper_container:{
        padding:3,
        flex:3
    },
})