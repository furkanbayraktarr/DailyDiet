import React from "react";
import styles from "./KahvaltıCard.style"
import { View, Text } from "react-native";


function KahvaltıCard({kahvaltıMeal}){

    
    return(
        
        <View style={styles.container}>
            <View style={styles.upper_container} >
            <Text style={styles.title} >{kahvaltıMeal.title}</Text>
            
            </View>
            <View style={styles.inner_container} >
            <Text style={styles.besin} >yağ:{kahvaltıMeal.yağ}</Text>
            <Text style={styles.besin} >karb:{kahvaltıMeal.krb}</Text>
            <Text style={styles.besin} >prot:{kahvaltıMeal.pro}</Text>
            <Text style={styles.besin} >kalori:{kahvaltıMeal.kcal}</Text>
            </View>
        </View>
    )
}
export default KahvaltıCard