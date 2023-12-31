import React from "react";
import styles from "./ÖğleCard.style"
import { View, Text } from "react-native";

function ÖğleCard({öğleMeal}){

    
    return(
        
        <View style={styles.container}>
            <View style={styles.upper_container} >
            <Text style={styles.title} >{öğleMeal.title}</Text>
            
            </View>
            <View style={styles.inner_container} >
            <Text style={styles.besin} >yağ:{öğleMeal.yağ}</Text>
            <Text style={styles.besin} >karb:{öğleMeal.krb}</Text>
            <Text style={styles.besin} >prot:{öğleMeal.pro}</Text>
            <Text style={styles.besin} >kalori:{öğleMeal.kcal}</Text>
            </View>
        </View>
    )
}
export default ÖğleCard