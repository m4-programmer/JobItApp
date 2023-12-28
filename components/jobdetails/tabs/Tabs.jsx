import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({label, activeTab, onHandleSearch}) => {
  return (
    <TouchableOpacity
      style={styles.btn(activeTab, label)}
      onPress={() => onHandleSearch(label)}
    >
      <Text style={styles.btnText(activeTab, label)}>{label}</Text>
    </TouchableOpacity>
  )
}
const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({item}) => (
          <TabButton
            label={item}
            activeTab={activeTab}
            onHandleSearch={setActiveTab}
          />       
        )}
        keyExtractor={item => item}
        contentContainerStyle={{columnGap: SIZES.small}}
        horizontal
        showsHorizontalScrollIndicator={false}
       />
    </View>
  )
}

export default Tabs