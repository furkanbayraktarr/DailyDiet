import React, {useState,useEffect} from "react";
import { SafeAreaView, View,Text, Image } from "react-native";
import styles from './Sign.style'
import Input from "../../../components/Input";
import {Formik} from 'formik'
import Button from "../../../components/Button";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";
import auth from '@react-native-firebase/auth'
import database from "@react-native-firebase/database"


function Sign ({navigation}) {

  const [userNamesList, setUserNamesList] = useState(null)

  function fetchUserNames(){
    
      try {
            
        database().ref(`userNames`)
        .once('value', snapshot=> {
        const NAME = snapshot.val() || {}
        setUserNamesList(NAME)
        console.log(NAME)})
        


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  }

  useEffect(()=>{fetchUserNames()},[])

const initialFormValues = {
    usermail:"",
    password:"",
    repassword:"",
}


function onSelect(){
  navigation.navigate("LoginPage")
}

async function handleFormSubmit (formValues) {
  const userName = formValues.usermail.split('@')[0]

  if(!formValues.usermail || !formValues.password 
    || !formValues.repassword){
    showMessage(
      {
        message: "Lütfen boş alanları doldurun",
        type:"danger"
    }
    )
    
    return
  }
  if(formValues.password !== formValues.repassword){
    showMessage({
      message:"Girdiğiniz şifreler uyuşmuyor",
      type:"danger"
    })
    
    return
  }
  if(userNamesList[userName] ){
    showMessage({
      message:"Kullanıcı adı başka kullanıcı için tanımlanmış",
      type:"danger"
    })
    
    return
  }
    try {
       auth().createUserWithEmailAndPassword(
            formValues.usermail,
            formValues.password,
        )
      
       database().ref(`userNames/${userName}`).push(userName)
        
       showMessage({
          message:"Kaydınız başarıyla oluşturuldu" ,
          type:"success"
        })
        

    } catch (error) {
      
      showMessage({
        message:authErrorMessageParser(error.code) ,
        type:"danger"
      })
        console.log(error.Error)
    }
}

    return(
        <SafeAreaView style={styles.container} >
          <View style={styles.logo_container} >
          <Image style={styles.logo} source={require("../../../assets/Apple_logo.png")} />
          <Text style={styles.header}>DailyDiet</Text>
          </View>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
  {({ values, handleChange, handleSubmit }) => (
    <>
    <View style={styles.inner_container} >
      <Input 
        placeholder="E-posta adresi giriniz..."
        placeholderTextColor="#d3d3d3"
        value={values.usermail}
        onType={handleChange("usermail")}
      />
      <Input 
        placeholder="Şifre giriniz..."
        placeholderTextColor="#d3d3d3"
        value={values.password}
        onType={handleChange("password")}
        isSecure
      />
      <Input 
        placeholder="Şifrenizi tekrar giriniz..."
        placeholderTextColor="#d3d3d3"
        value={values.repassword}
        onType={handleChange("repassword")}
        isSecure
      />
      <Button text="Kayıt Ol" onPress={handleSubmit} />
      <Button text="Giriş Yap" theme="secondary" onPress={onSelect} />
      </View>
    </>
  )}
</Formik>
            
        </SafeAreaView>
)
}

export default Sign