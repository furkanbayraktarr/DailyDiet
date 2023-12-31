import React, {useEffect,useState} from "react";
import { View,Text, ScrollView, TouchableWithoutFeedback } from "react-native"
import { BarChart } from 'react-native-chart-kit'
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import parseContentData from "../../../utils/parseContentData";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../styles/colors";
import AllMealsCard from "../../../components/Card/AllMealsCard";
import ÖğünCard from "../../../components/Card/ÖğünCard"
import styles from "./Report.style"



function Report(){

    const [kahvaltıList, setkahvaltıList] = useState([])
    const [öğleList, setÖğleList] = useState([])
    const [akşamList, setAkşamList] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const userName = auth().currentUser.email.split('@')[0]


    const fetchData = async () => {

        try {
            database().ref(`users/${userName}/kahvaltı`)
            .on('value', snapshot=> {
            const dataKahvaltı = snapshot.val() 
            const Data = parseContentData(dataKahvaltı || {})
            setkahvaltıList(Data)
            })

            database().ref(`users/${userName}/öğle`)
            .on('value', snapshot=> {
            const dataÖğle = snapshot.val() 
            const Data = parseContentData(dataÖğle || {})
            setÖğleList(Data)
            })

            database().ref(`users/${userName}/akşam`)
            .on('value', snapshot=> {
            const dataAkşam = snapshot.val() 
            const Data = parseContentData(dataAkşam || {})
            setAkşamList(Data)
            })

            database().ref(`users/${userName}/userInfo`)
            .on('value', snapshot=> {
            const userData = snapshot.val() 
            const Data = parseContentData(userData || {})
            setUserInfo(Data)})


          } catch (error) {
            console.error("Error fetching data:", error);
          }
        
    }

    useEffect(()=>{fetchData()},[])
    
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

    const totalBesin=(
        totalKahvaltıYağ + totalÖğleYağ + totalAkşamYağ 
      + totalKahvaltıPro + totalÖğlePro + totalAkşamPro
      + totalKahvaltıKrb + totalÖğleKrb + totalAkşamKrb)
    const yüzdeselYağ = (((totalgünlükYağ )/ (totalBesin)) * 100 ).toFixed(1)
    const yüzdeselkrb = ((totalgünlükKrb / totalBesin) * 100 ).toFixed(1)
    const yüzdeselPro = ((totalgünlükPro / totalBesin) * 100 ).toFixed(1)

    
        const data_kaloriler = {
          labels: ['Kahvaltı', 'Öğle', 'Akşam'],
          datasets: [
            {
              data: [totalKahvaltıKcal, totalÖğleKcal, totalAkşamKcal],
            },
          ],
        }
        const data_makrolar = {
          labels: ['Yağ', 'Karb', 'Prot'],
          datasets: [
            {
              data: [totalgünlükYağ, totalgünlükKrb, totalgünlükPro],
            },
          ],
        }
        const chartConfig = {
            backgroundGradientFrom: colors.slategray,
            backgroundGradientTo: colors.slategray,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity*2.5})`,
          }
        const chartStyle = {
            marginVertical: 8,
            borderRadius: 10,
            margin: 10,
          }

          const tümYemekler=[...kahvaltıList , ...öğleList, ...akşamList]

          const [pageView, setPageView] = useState("kaloriler")

          function selectKaloriler(){
            setPageView("kaloriler")
          }
          function selectMakrolar(){
            setPageView("makrolar")
          }


    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {pageView === "kaloriler" && (
            <View>
            <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectKaloriler}  >
                <View style={styles.selected_touch}>
            <Text style={styles.selected_text} >Kaloriler</Text>
            </View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={selectMakrolar} >
            <Text style={styles.unselected_text} >Makrolar</Text>
            </TouchableWithoutFeedback>
            </View>
        <View style={styles.upper_container} >
       
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >% Tgd</Text>
           <Text style={styles.değerler_total}>{yüzdeselTgd}</Text>
        </View>

        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Alınan Kalori</Text>
           <Text style={styles.değerler_total}>{totalgünlükKcal}</Text>
        </View>
        
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Tgd</Text>
           <Text style={styles.değerler_total}>{userInfo[0]?.kalori}</Text>
        </View>
        </View>
        
        <View style={styles.chart} >
            <BarChart
               data={data_kaloriler}
               width={320}
               height={180}
               chartConfig={chartConfig}
               style={chartStyle}
            />
        </View>
        <Text style={styles.besin_container_header}>Tüketilen Gıdalar</Text>
        <View style={styles.besin_header_border} ></View>
          <View style={styles.first_besin_title_container}>
                <Text style={styles.besin_title} >Kalori(kcal)</Text>
          </View> 
            
            
        <View>
          {tümYemekler.map(item => 
            (<AllMealsCard besin={false} kcal={true} key={item.id} meal={item} />))}
        </View>

        <View style={styles.öğün_container} >  
        <ÖğünCard besinView={false} kcalView={true}  öğün="Kahvaltı" yağ={totalKahvaltıYağ.toFixed(1)} pro={totalKahvaltıPro.toFixed(1)} 
        krb={totalKahvaltıKrb.toFixed(1)} kcal={totalKahvaltıKcal.toFixed(1)} />
        <ÖğünCard besinView={false} kcalView={true} öğün="Öğle" yağ={totalÖğleYağ.toFixed(1)} pro={totalÖğlePro.toFixed(1)} 
        krb={totalÖğleKrb.toFixed(1)} kcal={totalÖğleKcal.toFixed(1)} />
        <ÖğünCard besinView={false} kcalView={true}  öğün="Akşam" yağ={totalAkşamYağ.toFixed(1)} pro={totalAkşamPro.toFixed(1)} 
        krb={totalAkşamKrb.toFixed(1)} kcal={totalAkşamKcal.toFixed(1)} />
        <ÖğünCard besinView={false} theme="secondary" kcalView={true}  öğün="Toplam" yağ={totalgünlükYağ} pro={totalgünlükPro} 
        krb={totalgünlükKrb} kcal={totalgünlükKcal} />
        </View>
        
      </View>) }
      {pageView === "makrolar" && (
        <View>
            <View style={styles.upper_tab_container} >
              <TouchableWithoutFeedback onPress={selectKaloriler}   >
            <Text style={styles.unselected_text} >Kaloriler</Text>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={selectMakrolar}  >
            <View style={styles.selected_touch}>
            <Text style={styles.selected_text} >Makrolar</Text>
            </View>
            </TouchableWithoutFeedback>
            </View>
        <View style={styles.upper_container} >
       
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Hedef Yağ</Text>
           <Text style={styles.değerler_total}>%25</Text>
        </View>

        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Hedef Karbonhidrat</Text>
           <Text style={styles.değerler_total}>%55</Text>
        </View>
        
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Hedef Protein</Text>
           <Text style={styles.değerler_total}>%20</Text>
        </View>
        </View>
        <View style={styles.upper_container} >
       
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Alınan Yağ</Text>
           <Text style={styles.değerler_total}>%{yüzdeselYağ}</Text>
        </View>

        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Alınan Karbonhidrat</Text>
           <Text style={styles.değerler_total}>%{yüzdeselkrb}</Text>
           
        </View>
        
        <View style={styles.değer_isimleri_total_container}>
           <Text style={styles.değerler_total} >Alınan Protein</Text>
           <Text style={styles.değerler_total}>%{yüzdeselPro}</Text>
        </View>
        </View>
        
        <View style={styles.chart} >
            <BarChart
               data={data_makrolar}
               width={320}
               height={180}
               chartConfig={chartConfig}
               style={chartStyle}
            />
        </View>
        
        <Text style={styles.besin_container_header}>Tüketilen Gıdalar</Text>
        <View style={styles.besin_header_border} ></View>
          <View style={styles.second_besin_title_container}>
                <Text style={styles.besin_title} >Yağ(g)</Text>
                <Text style={styles.besin_title} >Karb(g)</Text>
                <Text style={styles.besin_title} >Prot(g)</Text>
          </View> 
          
            
            
        <View >
          {tümYemekler.map(item => (<AllMealsCard besin={true} kcal={false} key={item.id} meal={item} />))}
        </View>

        <View style={styles.öğün_container} >  
        <ÖğünCard besinView={true} kcalView={false} öğün="Kahvaltı" yağ={totalKahvaltıYağ.toFixed(1)} pro={totalKahvaltıPro.toFixed(1)} 
        krb={totalKahvaltıKrb.toFixed(1)}  />
        <ÖğünCard besinView={true} kcalView={false} öğün="Öğle" yağ={totalÖğleYağ.toFixed(1)} pro={totalÖğlePro.toFixed(1)} 
        krb={totalÖğleKrb.toFixed(1)}  />
        <ÖğünCard besinView={true} kcalView={false} öğün="Akşam" yağ={totalAkşamYağ.toFixed(1)} pro={totalAkşamPro.toFixed(1)} 
        krb={totalAkşamKrb.toFixed(1)}  />
        <ÖğünCard besinView={true} theme="secondary" kcalView={false} öğün="Toplam" yağ={totalgünlükYağ} pro={totalgünlükPro} 
        krb={totalgünlükKrb}  />
        </View>

      </View>) }
            
         </ScrollView>
    </SafeAreaView>
    )
}
export default Report