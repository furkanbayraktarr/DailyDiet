import React from "react";
import styles from "./FoodCard.style"
import { View, Text } from "react-native";
import Button from "../../Button";



function FoodCard({food, onSelect}){

function handleSelect(){
    onSelect(food)
}


    return(
        
        <View style={styles.container}>
            <View style={styles.upper_container} >
            <Text style={styles.title} >{food.title}</Text>
            <Button text="Ekle" theme="thirdly" onPress={handleSelect} />
            </View>
            <View style={styles.inner_container} >
            <Text style={styles.besin} >yağ:{food.yağ}</Text>
            <Text style={styles.besin} >krb:{food.karbonhidrat}</Text>
            <Text style={styles.besin} >pro:{food.protein}</Text>
            <Text style={styles.besin} >kcal:{food.kcal}</Text>
            </View>
        </View>
    )
}
export default FoodCard