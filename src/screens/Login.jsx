import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { COLORS } from '../constants';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);

  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter email and password.', ToastAndroid.SHORT);
      return;
    }

    const res = await dispatch(login(email, password));
    if (res) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    }
  };

  return (
    <View style={tw`flex-1 bg-[${COLORS.primary}] justify-center items-center`}>
      <View style={tw`w-72 py-4 rounded-md`}>
        <View style={tw`items-center mb-6`}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 60, height: 60, resizeMode: 'contain' }}
          />
        </View>

        <Input
          placeholder="Enter Your email"
          value={email}
          setValue={setEmail}
        />
        <Input
          placeholder="Enter Your password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <View style={tw`my-4 flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-white text-xs font-montserrat`}>
              You don't have account ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={tw`text-[${COLORS.secondary}] text-xs font-montserrat`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
            <Text style={tw`text-white text-xs font-montserrat`}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={[tw`py-3 rounded-md`, { backgroundColor: '#6DA7EC' }]}
        >
          <Text style={tw`text-white text-center text-base font-montserrat`}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
