import React, {useState} from "react"
import { SafeAreaView, View, FlatList, TouchableOpacity, Text} from "react-native"
import FoodCard from "../../../components/Card/FoodCard/"
import food_data from "../../../utils/foodData.json"
import SearchBar from "../../../components/SearchBar"
import styles from "./Search.style"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"

function Search({navigation,route}){

const id = route.params.id
const renderFood = ({item}) => <FoodCard food={item} onSelect={handleEkle} />
const renderSeperator = () => <View style={styles.seperator}/> 
const [list,setList]=useState([])
const userName = auth().currentUser.email.split('@')[0]

const handleEkle = (foods) =>{
  
  const öğün={
    title:foods.title,
    yağ: foods.yağ,
    krb:foods.karbonhidrat,
    pro:foods.protein,
    kcal:foods.kcal
  }
  return(
  database().ref(`users/${userName}/${id}`).push(öğün),
  console.log(öğün)
  )
}

const handleSearch = (text) => {
    if(text){
  const filteredList = food_data.filter(food=>{
    const searchedText = text.toLowerCase()
    const currentTitle = food.title.toLowerCase()

    return(
      currentTitle.indexOf(searchedText) >-1
    )     
    })
    setList(filteredList)
}
if(!text){
    return(
        setList([])
    )
}
  

}

function goBack(){
  navigation.navigate("MainPage",{id:id})
}

    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.container}> 
      <View style={styles.search_container} >
        <View style={styles.searchBar_container} >
        <SearchBar
      onSearch={handleSearch}
      />
      </View>
      <TouchableOpacity onPress={goBack}  >
        <Text style={styles.iptal_text} >İptal</Text>
      </TouchableOpacity>
      </View>
      <FlatList
      keyExtractor={item=>item.id.toString()}
      data={list}
      renderItem={renderFood}
      ItemSeparatorComponent={renderSeperator}

      />
      
      </View>
    </SafeAreaView>
    )
}
export default Search

