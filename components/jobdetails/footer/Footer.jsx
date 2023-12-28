import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({url=null}) => {
  console.log(url);
  const [like, setLike] = useState(false)
  console.log('====================================');
  
  console.log('====================================');
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={()=>setLike(!like)}>
        <Image
          source={like ? icons.heart : icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL((url != null) ? url[0]?.job_google_link : 'https://careers.google.com/jobs/results')}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer