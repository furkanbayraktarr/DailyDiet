import React,{useState,useEffect} from "react"
import { Alert, SafeAreaView, Text, View } from "react-native"
import database from "@react-native-firebase/database"
import parseContentData from "../../utils/parseContentData"
import styles from "./Profile.style"
import Button from "../../components/Button"
import auth from "@react-native-firebase/auth"



function Profile(){
    
  const userName = auth().currentUser.email.split('@')[0]
    
    const [contentList, setContentList] = useState([])

    const fetchData = async () => {

        try {
            
            database().ref(`users/${userName}/userInfo`)
            .on('value', snapshot=> {
            const contentData = snapshot.val() 
            const parseData = parseContentData(contentData || {})
            setContentList(parseData)
            console.log(contentList)})
            


          } catch (error) {
            console.error("Error fetching data:", error);
          }
        
    }

    useEffect(()=>{fetchData()},[])
    
function handleSıfırla(){
    
        Alert.alert(
            "Bilgileriniz sıfırlanacak, emin misiniz?",
            "Form ekranına yönlendirileceksiniz...",
        [
            {
              text: "İptal",
              style: "cancel"
            },
            {
              text: "Sıfırla",
              onPress: () => handleReset() // Bu fonksiyonu sıfırlama işleminizi gerçekleştirmek için kendi işleminize uygun bir şekilde değiştirin
            }
          ]
          )
        }

function handleReset(){
    return(
        database().ref(`users/${userName}`).remove(),
        database().ref(`users/names/${userName}`).remove()
    )
}        
function handleSignOut(){
  return(
    auth().signOut()
  )
}

        return(
            
            <SafeAreaView style={styles.container}>
              <View style={styles.inner_container} >
            <Text style={styles.text}>Kullanıcı: {contentList[0]?.userName}</Text>
            <Text style={styles.text}>Cinsiyet: {contentList[0]?.cinsiyet}</Text>
            <Text style={styles.text}>Kilo: {contentList[0]?.kilo}</Text>
            <Text style={styles.text}>Boy: {contentList[0]?.boy}</Text>
            <Text style={styles.text}>Yaş: {contentList[0]?.yaş}</Text>
            <Text style={styles.text}>
                Tavsiye edilen günlük kalori(tgd): {contentList[0]?.kalori} kcal</Text>
                </View>
                <View style={styles.button_container} >
            <Button text="Bilgilerimi Sıfırla" onPress={handleSıfırla} />
            <Button text="Çıkış Yap" theme="secondary" onPress={handleSignOut} />
            </View>
            
        </SafeAreaView>)

    }

export default Profile