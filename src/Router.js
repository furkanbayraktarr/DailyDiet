import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import colors from "./styles/colors";
import auth from "@react-native-firebase/auth"
import Info from "./pages/DietProgram/Info";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Profile from "./pages/Profile/Profile";
import Report from "./pages/Report/Report";
import Main from "./pages/Home/Main";
import Search from "./pages/Home/Search";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import database from "@react-native-firebase/database"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Router =()=>{

const [userSession, setUserSession] = useState()
const [users,setUsers] = useState({})
const userName = auth().currentUser?.email.split('@')[0]

const fetchUsers = () => {
database().ref(`users/names`)
            .on('value', snapshot=> {
            const users = snapshot.val()|| {}
            setUsers(users)})
}


useEffect(() => {fetchUsers(), auth().onAuthStateChanged((user) => 
    {setUserSession(!!user)} )} , [])


const AuthStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="SignPage" component={Sign} options={{headerShown:false}}/>
            
        </Stack.Navigator>
    )
}

const HomeStack=()=>{
    return(
    <Stack.Navigator>
        <Stack.Screen name="MainPage" component={Main} options={{headerShown:false}}/>
        <Stack.Screen name="SearchPage" component={Search} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

const InfoStack = ()=> {
    return(
        <Stack.Navigator>
        <Stack.Screen name="InfoPage" component={Info} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


const TabStack =()=>{
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor:"#696969", borderRadius:10, 
            position:"absolute",margin:15
        },
        tabBarShowLabel: false
          }}>
            <Tab.Screen name="HomePage" component={HomeStack} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'white' : colors.darkgray
                    return <Icon name={'home'}
                     size={size} color={iconColor} />}
                     }}
     /> 
            <Tab.Screen name="ReportPage" component={Report} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'white' : colors.darkgray
                    return <Icon name={'chart-bar'}
                     size={size} color={iconColor} />}
                     
                      }} />
            <Tab.Screen name="ProfilePage" component={Profile} options=
            {{headerShown:false,
                tabBarIcon: ({focused ,size }) => {
                    const iconColor = focused ? 'white' : colors.darkgray
                    return <Icon name={'account'}
                     size={size} color={iconColor} />}
                     }} />
        </Tab.Navigator>
    )
}


    return(
        <NavigationContainer>
            <Stack.Navigator>
        {!userSession ? (<Stack.Screen name="AuthStack" component={AuthStack}
             options={{headerShown:false}}/>):
        userSession && users[userName] ? (<Stack.Screen name="TabStack" component={TabStack} 
            options={{headerShown:false}} />):
        userSession && !users[userName] && (<Stack.Screen name="InfoStack" component={InfoStack}
             options={{headerShown:false}}/>)}
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    )
}
export default Router