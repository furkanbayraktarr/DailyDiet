import React from "react";
import styles from "./AkşamCard.style"
import { View, Text } from "react-native";

function AkşamCard({akşamMeal}){

   
    return(
        
        <View style={styles.container}>
            <View style={styles.upper_container} >
            <Text style={styles.title} >{akşamMeal.title}</Text>
            
            </View>
            <View style={styles.inner_container} >
            <Text style={styles.besin} >yağ:{akşamMeal.yağ}</Text>
            <Text style={styles.besin} >karb:{akşamMeal.krb}</Text>
            <Text style={styles.besin} >prot:{akşamMeal.pro}</Text>
            <Text style={styles.besin} >kalori:{akşamMeal.kcal}</Text>
            </View>
        </View>
    )
}
export default AkşamCard