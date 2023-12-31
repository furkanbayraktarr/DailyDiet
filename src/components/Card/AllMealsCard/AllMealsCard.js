import React from "react";
import styles from "./AllMealsCard.style"
import { View, Text } from "react-native";

function AllMealsCard({meal,besin,kcal}){
    return(
        
        
        <View style={styles.container}>
            <View style={styles.upper_container} >
            <Text style={styles.title} >{meal.title}</Text>
            
            </View>
            <View style={styles.inner_container} >
            {besin && <Text style={styles.besin} >{meal.yağ}</Text>}
            {besin && <Text style={styles.besin} >{meal.krb}</Text>}
            {besin && <Text style={styles.besin} >{meal.pro}</Text>}
            {kcal && <Text style={styles.besin_kcal} >{meal.kcal}</Text>}
            </View>
        </View>
    )
}
export default AllMealsCard