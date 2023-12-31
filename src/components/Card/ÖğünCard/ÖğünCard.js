import React from "react";
import styles from "./ÖğünCard.style"
import { View, Text } from "react-native";

function ÖğünCard({theme="primary", öğün,yağ,krb,pro,kcal,kcalView,besinView}){
    return(
        
        
        <View style={styles[theme].container}>
            <View style={styles[theme].upper_container} >
            <Text style={styles[theme].title} >{öğün}</Text>
            
            </View>
            <View style={styles[theme].inner_container} >
            {besinView && <Text style={styles[theme].besin} >{yağ}</Text>}
            {besinView && <Text style={styles[theme].besin} >{krb}</Text>}
            {besinView && <Text style={styles[theme].besin} >{pro}</Text>}
            {kcalView && <Text style={styles[theme].besin_kcal} >{kcal}</Text>}
            </View>
        </View>
    )
}
export default ÖğünCard