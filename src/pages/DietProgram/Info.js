import { SafeAreaView,Text, View, TouchableOpacity} from "react-native"
import React, {useState} from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"
import styles from './Info.style'
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import { Formik } from "formik"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { showMessage } from "react-native-flash-message"
import colors from "../../styles/colors"

function Info() {


    const initialFormValues={
        kilo:"",
        boy:"",
        yaş:"",
        cinsiyet:"",
        aktivite:""
    }

    async function handleFormSubmit(values){
        if(!values.kilo || !values.boy || !values.yaş || !values.cinsiyet || !values.aktivite ){
          showMessage(
            {
              message: "Lütfen boş alanları doldurun",
              type:"danger"
          })
          return
        }
        if(isNaN(values.kilo) || isNaN(values.boy) || isNaN(values.yaş)){
          showMessage(
            {
              message: "Lütfen sayı değeri giriniz",
              type:"danger"
          })
          return
        }
        const userName = auth().currentUser.email.split('@')[0]
        
        
        const userErkekInfo = {
          userName:userName,
          kilo:values.kilo,
          boy:values.boy,
          yaş:values.yaş,
          aktivite:values.aktivite,
          cinsiyet:values.cinsiyet,
          kalori: ((66.5 + (13.75 * values.kilo) + (5 * values.boy) - 
          (6.77 * values.yaş))*values.aktivite).toFixed(1),
        }

        const userKadınInfo = {
          userName:userName,
          kilo:values.kilo,
          boy:values.boy,
          aktivite:values.aktivite,
          yaş:values.yaş,
          cinsiyet:values.cinsiyet,
          kalori: ((655.1 + (9.56 * values.kilo) + (1.85 * values.boy) - 
          (4.67 * values.yaş))*values.aktivite).toFixed(1),
        }

        if(values.cinsiyet==="erkek"){
        return(
        await database().ref(`users/${userName}/kahvaltıTime`).remove(),
        await database().ref(`users/${userName}/öğleTime`).remove(),
        await database().ref(`users/${userName}/akşamTime`).remove(),
        await database().ref(`users/${userName}/userInfo`).remove(),
        

        database().ref(`users/${userName}/userInfo`).push(userErkekInfo),
        database().ref(`users/names/${userName}`).push(userName), 

        showMessage(
            {
              message: "Bilgileriniz başarıyla kaydedildi...",
              type:"success"
          })
          
        )
    }
    if(values.cinsiyet==="kadın"){
      return(
        await database().ref(`users/${userName}/kahvaltıTime`).remove(),
        await database().ref(`users/${userName}/öğleTime`).remove(),
        await database().ref(`users/${userName}/akşamTime`).remove(),  
      await database().ref(`users/${userName}/userInfo`).remove(),
      

      database().ref(`users/${userName}/userInfo`).push(userKadınInfo), 

      showMessage(
          {
            message: "Bilgileriniz başarıyla kaydedildi...",
            type:"success"
        })
        
      )
  }}
  function handleSignOut(){
    return(
      auth().signOut()
    )
  }

    return(
    <SafeAreaView style={styles.container} >
      <View style={styles.header_container}>
      <Text style={styles.header}>Kullanıcı Formu</Text>
      <View style={styles.header_border} ></View>
      </View>
      <View style={styles.text_container}>
    <Text style={styles.text} >Lütfen bilgilerinizi girin, girdiğiniz bilgilere göre günlük kalori ihtiyacınız belirlenecek..</Text>
      </View> 
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
  {({ values, handleChange, handleSubmit,setValues }) => (
    <>
    <View style={styles.bottom_container} >

<View style={styles.gender_container} >
<TouchableOpacity style={styles.checkBox}
 onPress={() => {setValues({ ...values, cinsiyet: "erkek" })}}>
{values.cinsiyet === "erkek" && (
                        <Icon name="checkbox-marked" size={25} color={colors.green} />
                      )}
{values.cinsiyet !== "erkek" && (
                        <Icon name="checkbox-blank-outline" size={25} color={colors.green} />
                      )}                      
</TouchableOpacity>
<Text style={styles.gender_title} >Erkek</Text>
<TouchableOpacity style={styles.checkBox} 
onPress={() => {setValues({ ...values, cinsiyet: "kadın" })}}>
{values.cinsiyet === "kadın" && (
                        <Icon name="checkbox-marked" size={25} color={colors.green} />
                      )}
{values.cinsiyet !== "kadın" && (
                        <Icon name="checkbox-blank-outline" size={25} color={colors.green} />
                      )}                      
</TouchableOpacity>
<Text style={styles.gender_title} >Kadın</Text>
</View>

    <View style={styles.input_container} >
        <Input theme="thirdly" placeholder="Kilo(kg)" 
        placeholderTextColor="#d3d3d3" value={values.kilo}
        onType={handleChange("kilo")}/> 
    
        <Input theme="thirdly" placeholder="Boy(cm)"
        placeholderTextColor="#d3d3d3" value={values.boy}
        onType={handleChange("boy")}/> 
    
        <Input theme="thirdly" placeholder="Yaş"
        placeholderTextColor="#d3d3d3" value={values.yaş}
        onType={handleChange("yaş")}/> 
        
    </View> 

    <View style={styles.aktivity_container} >
      <Text style={styles.aktivity_header} >Aktivite Durumunuzu Seçin</Text>
<TouchableOpacity style={styles.checkAktivity}
 onPress={() => {setValues({ ...values, aktivite: "1.2" })}}>
{values.aktivite === "1.2" && (
    <Text style={styles.selected_aktivity_text} >Hareketsiz</Text>
                      )}
{values.aktivite !== "1.2" && (
    <Text style={styles.unselected_aktivity_text} >Hareketsiz</Text>
                      )}                      
</TouchableOpacity>

<TouchableOpacity style={styles.checkAktivity}
 onPress={() => {setValues({ ...values, aktivite: "1.3" })}}>
{values.aktivite === "1.3" && (
    <Text style={styles.selected_aktivity_text} >Az Hareketli</Text>
                      )}
{values.aktivite !== "1.3" && (
    <Text style={styles.unselected_aktivity_text} >Az Hareketli</Text>
                      )}                      
</TouchableOpacity>

<TouchableOpacity style={styles.checkAktivity}
 onPress={() => {setValues({ ...values, aktivite: "1.4" })}}>
{values.aktivite === "1.4" && (
    <Text style={styles.selected_aktivity_text} >Orta Hareketli</Text>
                      )}
{values.aktivite !== "1.4" && (
    <Text style={styles.unselected_aktivity_text} >Orta Hareketli</Text>
                      )}                      
</TouchableOpacity>

<TouchableOpacity style={styles.checkAktivity}
 onPress={() => {setValues({ ...values, aktivite: "1.5" })}}>
{values.aktivite === "1.5" && (
    <Text style={styles.selected_aktivity_text} >Çok Hareketli</Text>
                      )}
{values.aktivite !== "1.5" && (
    <Text style={styles.unselected_aktivity_text} >Çok Hareketli</Text>
                      )}                      
</TouchableOpacity>
</View>

<Button text="Kaydet" onPress={handleSubmit} />
</View>
</>
  )}
</Formik>
<View style={styles.button_çıkış} >
<Button text="Çıkış Yap" theme="secondary" onPress={handleSignOut} />
</View>
    </SafeAreaView>
    )
}
export default Info

