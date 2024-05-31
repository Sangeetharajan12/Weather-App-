import React from 'react';
import { View ,StyleSheet} from 'react-native';
import Weather from './Weather';


export default function App() {
  return (
    
    <View style={
      styles.container}>
       
      <Weather />
    </View>
  );
}
const styles=StyleSheet.create({
  container:{
  flex: 1, 
  justifyContent: 'center',
   alignItems: 'center' ,
    backgroundColor:'#c3f2f2',
    
},


}
)
