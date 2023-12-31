import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl  } from 'react-native'
import {useCallback, useState} from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Company, JobAbout, JobFooter, JobTabs, Specifics, ScreenHeaderBtn } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import useFetch from '../../hook/useFetch'
const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const {data, isLoading, error, refresh} = useFetch('job-details', {job_id: params.id})
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      refresh();
      setRefreshing(false);
    })
    const tabs = ['About', 'Qualifications', 'Responsibilities'];
    const [activeTab, setActiveTab] = useState(tabs[1])
    console.log('====================================');
    console.log(data);
    console.log('====================================');

    const displayTabContent = () => {
        switch(activeTab){
            case 'Qualifications':
                return <Specifics 
                title="Qualifications"
                points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case 'About':
                return <JobAbout info={data[0].job_description ?? 'No data provided'} />
            case 'Responsibilities':
                return <Specifics 
                title="Responsibilities"
                points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
            default:
                break;
        }
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
      options={{
        headerStyle: {backgroundColor: COLORS.lightWhite},
        headerShadowVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.left} dimension={'60%'} handlePress={() => router.back()}/>
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={icons.share} dimension={'60%'} />
        ),
        headerTitle: ''
      }}
      >
      </Stack.Screen>

      <>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{padding: SIZES.medium, paddingBottom: 100}}>
            <Company 
            companyLogo={data[0].employer_logo} 
            companyName={data[0].employer_name} 
            jobTitle={data[0].job_title}
            Location={data[0].job_country}
             />
            <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {
                displayTabContent()
            }
          </View>
        )}
    
      </ScrollView>
        
        <JobFooter 
            url={data } 
        />      
        
      </>

    </SafeAreaView>
  )
}

export default JobDetails