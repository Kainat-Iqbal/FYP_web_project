import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import {Tabs,Redirect} from 'expo-router'
import {icons} from './../../constants'

const TabICon=(icon,color,name,focused)=>{
  return(
<View >
  <Image
  source={icon}
  resizeMode='contain'
  black={color}/>
  <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
</View>
  )
}

const TabsLayout = () => {
  return (
   <>
   <Tabs>
   <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabICon
                icon={icons.logout}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
  </Tabs>
   </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})