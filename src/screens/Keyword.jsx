import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from '../customtwrnc'
import { COLORS } from '../constants'
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { saveKeyword } from '../redux/actions/user';
import { useNavigation } from '@react-navigation/native';

// const GradientText = ({ children, selected, onPress }) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <LinearGradient
//         colors={['#53C8D8', '#668AF7']}
//         style={tw`p-1 px-3 rounded-3xl flex items-center ${selected ? 'opacity-20' : ''}`}

//       >
//         <Text style={tw`text-white text-sm font-montserrat`}>{children}</Text>
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// };

export const GradientText = ({ children, selected, onPress }) => {
  return (
    <>
      {
        !selected ? (
          <TouchableOpacity onPress={onPress}>
            <View
              
              style={tw`p-1 px-3 rounded-2xl flex items-center border border-[${COLORS.secondary}]`}

            >
              <Text style={tw`text-white text-sm font-montserrat text-[${COLORS.secondary}]`}>{children}</Text>
            </View>
          </TouchableOpacity>
        ):
        (
          <TouchableOpacity onPress={onPress}>
            <LinearGradient
              colors={['#53C8D8', '#668AF7']}
              style={tw`p-1 px-3 rounded-3xl flex items-center `}

            >
              <Text style={tw`text-white text-sm font-montserrat`}>{children}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )
      }
    </>
    
  );
};

const allKeyword =[
  '#News',
  '#Politics',
  '#Science',
  '#Technology',
  '#Health',
  '#Environment',
  '#Education',
  '#History',
  '#Sports',
  '#AI',
  '#Business',
  '#Finance',
  '#Travel',
  '#Culture',
  '#Art',
  '#Fashion',
  '#Food',
  '#Cooking',
  '#DIY',
  '#Fitness',
  '#Wellness',
  '#Nature',
  '#Space',
  '#Philosophy',
  '#Psychology',
  '#Sustainability'
]

const Keyword = () => {
  const [keyword, setKeyword] = useState([]);

  const handleSelect = (k) => {
    setKeyword(prev => {
      if(prev.includes(k)){
        return prev.filter(ke => ke != k);
      }else{
        return [...prev,k];
      }
    })
  }
  const navigation = useNavigation();
  const handleNext = async () => {
    const res = await saveKeyword(keyword);
    if(res){
      navigation.reset({
          index: 0,
          routes: [{ name: 'home' }],
      });
    }
  }
  return (
    <View style={tw`flex-1 bg-[${COLORS.primary}] py-4`}>
      <View style={tw`flex items-center`}>
        <Image source={require('../../assets/fulllogo.png')} style={{ width: 80, height: 80, resizeMode: 'contain', marginBottom: 2 }} />
      </View>
      <View style={tw`flex gap-2 items-center`}>
        <Text style={tw`text-white text-lg text-center font-montserrat`}>
          Choose some of your favorite topics
        </Text>
        <Text style={tw`text-white text-2xl text-center`}>
          (0/5)
        </Text>
      </View>


      <View style={tw`p-4 flex flex-wrap flex-row gap-3`}>
        {
          allKeyword.map((k) => (
            <GradientText onPress={() => handleSelect(k)} selected={keyword.includes(k)}>
              {k}
            </GradientText>
          ))
        }
      </View>

      <View style={tw`p-4 px-8`}>
        <Button onPress={handleNext}>NEXT</Button>
      </View>
    </View>
  )
}



export default Keyword