import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./Main.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../styles/colors";
import parseContentData from "../../../utils/parseContentData";
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import KahvaltıCard from "../../../components/Card/KahvaltıCard";
import AkşamCard from "../../../components/Card/AkşamCard";
import ÖğleCard from "../../../components/Card/ÖğleCard"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TotalValues from "../../../components/Card/TotalValues";
import Swipeout from "react-native-swipeout";



function Main({navigation}){

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedBreakfastHour, setSelectedBreakfastHour] = useState(null);
    const [selectedLunchHour, setSelectedLunchHour] = useState(null);
    const [selectedDinnerHour, setSelectedDinnerHour] = useState(null);

    const formatHour = (dateString) => {
        const date = new Date(dateString);
        const formattedHour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedHour;
      };

  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDateTimePicker  = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (hour) => {
    const time={
     time:`${hour}`
    }

    console.log('Selected Date and Hour:', hour);
    if (selectedMeal === 'breakfast') {
        await database().ref(`users/${userName}/kahvaltıTime`).remove(),
        database().ref(`users/${userName}/kahvaltıTime`).push(time)
      } else if (selectedMeal === 'lunch') {
        await database().ref(`users/${userName}/öğleTime`).remove(),
        database().ref(`users/${userName}/öğleTime`).push(time)
      } else if (selectedMeal === 'dinner') {
        await database().ref(`users/${userName}/akşamTime`).remove(),
        database().ref(`users/${userName}/akşamTime`).push(time)
      }
  
      hideDateTimePicker ();
    }

    const [selectedMeal, setSelectedMeal] = useState(null);

    const [kahvaltıList, setkahvaltıList] = useState([])
    const [öğleList, setÖğleList] = useState([])
    const [akşamList, setAkşamList] = useState([])
    const [userInfo, setUserInfo] = useState([])

    const userName = auth().currentUser.email.split('@')[0]
    const fetchData = () => {

        try {
            database().ref(`users/${userName}/kahvaltı`)
            .on('value', snapshot=> {
            const kahvaltıData = snapshot.val() 
            const parseData = parseContentData(kahvaltıData || {})
            setkahvaltıList(parseData)
            console.log("KahvaltıListesi:",kahvaltıList)})

            database().ref(`users/${userName}/öğle`)
            .on('value', snapshot=> {
            const öğleData = snapshot.val() 
            const parseData = parseContentData(öğleData || {})
            setÖğleList(parseData)
            console.log("ÖğleListesi:",öğleList)})

            database().ref(`users/${userName}/akşam`)
            .on('value', snapshot=> {
            const akşamData = snapshot.val() 
            const parseData = parseContentData(akşamData || {})
            setAkşamList(parseData)
            console.log("AkşamListesi:",akşamList)})

            database().ref(`users/${userName}/userInfo`)
            .on('value', snapshot=> {
            const contentData = snapshot.val() 
            const parseData = parseContentData(contentData || {})
            setUserInfo(parseData)})

            database().ref(`users/${userName}/kahvaltıTime`)
            .on('value', snapshot=> {
            const kahvaltıTime = snapshot.val()
            const parseData = parseContentData(kahvaltıTime || {})
            setSelectedBreakfastHour(parseData)
            console.log("KahvaltıTime:",parseData)})

            database().ref(`users/${userName}/öğleTime`)
            .on('value', snapshot=> {
            const öğleTime = snapshot.val()
            const parseData = parseContentData(öğleTime || {})
            setSelectedLunchHour(parseData)
            console.log("ÖğleTime:",parseData)})

            database().ref(`users/${userName}/akşamTime`)
            .on('value', snapshot=> {
            const akşamTime = snapshot.val()
            const parseData = parseContentData(akşamTime || {})
            setSelectedDinnerHour(parseData)
            console.log("AkşamTime:",parseData)})

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        
    }

    useEffect(()=>{fetchData()},[])

    function onKahvaltı(){
        navigation.navigate("SearchPage",{id:"kahvaltı"})    
    }

    function onÖğle(){
        navigation.navigate("SearchPage",{id:"öğle"})
    }

    function onAkşam(){
        navigation.navigate("SearchPage",{id:"akşam"})
    }


const handleKahvaltıSil = (item) => {
    return(
        database().ref(`users/${userName}/kahvaltı/${item.id}`).remove()
    )
}
const handleÖğleSil = (öğleMeal) => {
    return(
        database().ref(`users/${userName}/öğle/${öğleMeal.id}`).remove()
    )
}
const handleAkşamSil = (akşamMeal) => {
    return(
        database().ref(`users/${userName}/akşam/${akşamMeal.id}`).remove()
    )
}

const totalKahvaltıKcal = kahvaltıList.reduce((acc, item) => acc + item.kcal, 0)
const totalÖğleKcal = öğleList.reduce((acc, item) => acc + item.kcal, 0)
const totalAkşamKcal = akşamList.reduce((acc, item) => acc + item.kcal, 0)

const totalKahvaltıYağ = kahvaltıList.reduce((acc, item) => acc + item.yağ, 0)
const totalÖğleYağ = öğleList.reduce((acc, item) => acc + item.yağ, 0)
const totalAkşamYağ = akşamList.reduce((acc, item) => acc + item.yağ, 0)

const totalKahvaltıKrb = kahvaltıList.reduce((acc, item) => acc + item.krb, 0)
const totalÖğleKrb = öğleList.reduce((acc, item) => acc + item.krb, 0)
const totalAkşamKrb = akşamList.reduce((acc, item) => acc + item.krb, 0)

const totalKahvaltıPro = kahvaltıList.reduce((acc, item) => acc + item.pro, 0)
const totalÖğlePro = öğleList.reduce((acc, item) => acc + item.pro, 0)
const totalAkşamPro = akşamList.reduce((acc, item) => acc + item.pro, 0)

const totalgünlükKcal = (totalKahvaltıKcal + totalÖğleKcal + totalAkşamKcal).toFixed(1)
const totalgünlükYağ = (totalKahvaltıYağ + totalÖğleYağ + totalAkşamYağ).toFixed(1)
const totalgünlükKrb = (totalKahvaltıKrb + totalÖğleKrb + totalAkşamKrb).toFixed(1)
const totalgünlükPro = (totalKahvaltıPro + totalÖğlePro + totalAkşamPro).toFixed(1)
const yüzdeselTgd = ((totalgünlükKcal / userInfo[0]?.kalori) * 100).toFixed(1)


const selectTimeForKahvaltı = () => {
    setSelectedMeal('breakfast');
    showDateTimePicker();
  };

  const selectTimeForÖğle = () => {
    setSelectedMeal('lunch');
    showDateTimePicker();
  };

  const selectTimeForAkşam = () => {
    setSelectedMeal('dinner');
    showDateTimePicker();
  };

  

    return(
    <SafeAreaView style={styles.main_container} >
<ScrollView>
    <TotalValues KCAL={totalgünlükKcal} KRB={totalgünlükKrb} PRO={totalgünlükPro} 
        YAĞ={totalgünlükYağ} TGD={yüzdeselTgd}  />

    <View style={styles.container} >
        <View style={styles.meal} >
           <Text style={styles.title} >Kahvaltı: {totalKahvaltıKcal}</Text>
           {selectedBreakfastHour !== null && (
            <Text style={styles.hour}>
            {selectedBreakfastHour[0] && formatHour(selectedBreakfastHour[0]?.time)}
            </Text>
          )}
           <TouchableOpacity style={styles.time} onPress={selectTimeForKahvaltı} >
           <Icon name="clock-time-four-outline"  size={30} color="white" /> 
           </TouchableOpacity>
           <TouchableOpacity style={styles.add} onPress={onKahvaltı} >
           <Icon name="plus-thick"  size={30} color={colors.green} /> 
           </TouchableOpacity>
        </View>
        <View >
      {kahvaltıList.map(item => (<Swipeout
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleKahvaltıSil(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
        <KahvaltıCard kahvaltıMeal={item}  /> 
        </Swipeout>) )}
      </View>
        
        <View style={styles.meal} >
           <Text style={styles.title} >Öğle: {totalÖğleKcal}</Text>
           {selectedLunchHour !== null && (
            <Text style={styles.hour}>
             {selectedLunchHour[0] && formatHour(selectedLunchHour[0]?.time)}
            </Text>
          )}
          
           <TouchableOpacity style={styles.time} onPress={selectTimeForÖğle} >
           <Icon name="clock-time-four-outline"  size={30} color="white" /> 
           </TouchableOpacity>
           <TouchableOpacity style={styles.add} onPress={onÖğle} >
           <Icon name="plus-thick"  size={30} color={colors.green} />
           </TouchableOpacity>
          
        </View>
        <View >
        {öğleList.map(item => (<Swipeout
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleÖğleSil(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
        <ÖğleCard öğleMeal={item}  /> 
        </Swipeout>) )}
      </View>
        <View style={styles.meal} >
            <Text style={styles.title} >Akşam: {totalAkşamKcal} </Text>
            {selectedDinnerHour !== null && (
            <Text style={styles.hour}>
             {selectedDinnerHour[0] && formatHour(selectedDinnerHour[0]?.time)}
            </Text>
            )}
            <TouchableOpacity style={styles.time} onPress={selectTimeForAkşam} >
           <Icon name="clock-time-four-outline"  size={30} color="white"/> 
           </TouchableOpacity>
            <TouchableOpacity style={styles.add} onPress={onAkşam} >
            <Icon name="plus-thick"  size={30} color={colors.green} />
            </TouchableOpacity>
           
        </View>
        
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDateTimePicker }
      />
    </View>
      <View style={styles.akşam_container} >
      {akşamList.map(item => (<Swipeout
      right={[
        {
          text: "Sil",
          backgroundColor: "red",
          onPress: () => handleAkşamSil(item)
        },
      ]}
      autoClose={true} style={styles.swipeout} >
        <AkşamCard akşamMeal={item}  /> 
        </Swipeout>) )}
      
      </View>
      </ScrollView>
    </SafeAreaView>
    )
}
export default Main