import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Keyboard,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
const appColors={
    white:'#ffff',
    gray:'grey',
}

interface props {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?:StyleProp<TextStyle>
  name: string;
  isLoading?: boolean;
  disable?: boolean;
  onPress: () => void;
  bgcolor?: string;
}
export const RButton = ({
  name,
  disable,
  buttonStyle,
  textStyle,
  isLoading,
  onPress,
  bgcolor
}: props) => {

 const onPressTouch=()=>{
    Keyboard.dismiss();
    onPress()
  }
  return (
    
      <TouchableOpacity
        disabled={isLoading || disable}
        style={[
          styles.view,
          {
            backgroundColor:
              isLoading || disable ? appColors.gray : bgcolor,
          },
          buttonStyle,
        ]}
        onPress={onPressTouch}> 
          {isLoading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator color={appColors.white} />
              <Text style={[styles.text, {marginLeft: 10}]}>
                {'Please wait..'}
              </Text>
            </View>
          ) : (
            <Text style={[styles.text,textStyle]}>{name}</Text>
          )} 
      </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  text: {
    // fontWeight: '500',
    // fontSize: 14,
    // lineHeight: 28,
    // textAlign: 'center',
    // color: appColors.white,
  },
  loadingView: {
    // flexDirection: 'row',
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  view: {
    // height: 45,
    // borderRadius: 45,
    // justifyContent: 'center',
  },
});
