import React from "react"
import { View,Text } from "react-native"
import styles from "./TotalValues.styles"

function TotalValues({KCAL,KRB,PRO,YAĞ,TGD}){

    return(
        <View style={styles.upper_container} >
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Yağ</Text>
           <Text style={styles.değerler_total}>{YAĞ}</Text>
        </View>
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Karb</Text>
           <Text style={styles.değerler_total}>{KRB}</Text>
        </View>
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Prot</Text>
           <Text style={styles.değerler_total}>{PRO}</Text>
        </View>
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Tgd</Text>
           <Text style={styles.değerler_total}>%{TGD}</Text>
        </View>
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total_kalori} >Kalori</Text>
           <Text style={styles.değerler_total_kalori}>{KCAL}</Text>
        </View>
        </View>
    )
}
export default TotalValues