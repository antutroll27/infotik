import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from 'twrnc';
import { COLORS } from '../constants';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation,StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isAuth} = useSelector(store => store.user);

  


  const handleLogin = async () => {
    if(!email || !password){
      ToastAndroid.show('Please enter email and password.', ToastAndroid.SHORT);
      return
    }

    const res = await dispatch(login(email,password));
    if(res){
      navigation.reset({
          index: 0,
          routes: [{ name: 'home' }],
      });
    }
  }
  return (
    <View style={tw`flex-1 bg-[${COLORS.primary}] flex justify-center items-center`}>
      <View style={tw` w-[18rem] py-4 rounded-md`}>
        <View style={tw`flex items-center`}>
          <Image source={require('../../assets/logo.png')} style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: 5 }} />
        </View>


        <Input placeholder={"Enter Your email"} value={email} setValue={setEmail} />
        <Input placeholder={"Enter Your password"} value={password} setValue={setPassword} secureTextEntry={true} />

        <View style={tw`mb-4 mt-1 flex flex-row justify-between`}>
          <View style={tw`flex flex-row items-center gap-1`}>
          <Text style={tw.style(`text-white text-[10px]`,{fontFamily: 'Montserrat'})}>You don't have account ?</Text>
          <TouchableOpacity>
              <Text style={tw.style(`text-[${COLORS.secondary}] text-[10px] translate-y-2`,{fontFamily: 'Montserrat'})} onPress={() => navigation.navigate('register')}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={tw.style(`text-white text-[10px]`,{fontFamily: 'Montserrat'})}>Forgot Password</Text>
        </View>
        <Button onPress={handleLogin}>SIGN IN</Button>
      </View>
    </View>
  )
}

export default Login