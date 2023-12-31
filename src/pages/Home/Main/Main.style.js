import { Dimensions, StyleSheet } from "react-native"
import colors from "../../../styles/colors"

export default StyleSheet.create({
    main_container:{
        flex:1,
        backgroundColor:"black"
    },
    container:{
        backgroundColor:"black",
    },
    meal:{
        backgroundColor:colors.slategray,
        flexDirection:"row",
        padding:10,
        justifyContent:"space-between",
        margin:20,
        marginBottom:0,
        marginTop:15,
        borderRadius:5,
        padding:5
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        padding:5,
        color:"black",
        flex:1
    },
    öğün_title:{
        fontSize:20,
        color:"black",
        fontWeight:"bold",

    },
    değerler_container:{
        flexDirection:"row",
        margin:10
    },
    öğünler_container:{
        flex:1
    },
    kahvaltı_container:{
        margin:10,
        marginLeft:10,
        marginTop:0,
        backgroundColor:"red"
        
        
    },
    öğle_container:{
        margin:10,
        marginLeft:10,
        marginTop:0
        
    },
    akşam_container:{
        margin:10,
        marginLeft:10,
        marginTop:0
        
    },
    flatList:{
        height: Dimensions.get("window").height/5.5,
        marginTop:0,
    },
    swipeout:{
        backgroundColor:colors.slategray,
         borderRadius: 5, 
         marginTop:5,
         marginLeft:20,
         marginRight:20
    },
    time:{
        marginRight:5,
        alignSelf:"center"
    },
    add:{
        alignSelf:"center"
    },
    hour:{
        marginRight:2,
        fontSize:15,
        color:"white",
        alignSelf:"center"
    },
    akşam_container:{
        marginBottom:100
    }
})