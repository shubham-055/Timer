import { View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolateColor, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Animation = () => {
    useEffect(()=>{
        
       const timer = setInterval(() => {
            handlePress();
        }, 2000);
        return ()=>{
            console.log("skjdsnjhsndd");
            clearInterval(timer)
        }
    },[])
    const { width: xlimit, height: ylimit } = Dimensions.get("window");
    const insets = useSafeAreaInsets();
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const Boxheight = useSharedValue(100);
    const Boxwidth = useSharedValue(100);
    const color = useSharedValue(getRandomColor());
    // console.log('------>',color);

    const handlePress = () => {
        const randomHeight = getRandomValue(25, 200);
        const randomWidth = getRandomValue(25, 200);
        const randomX = Math.floor(Math.random() * (xlimit - randomWidth-10));
        const randomY = Math.floor(Math.random() * (ylimit - insets.top - insets.bottom - randomHeight));
        
        const randomColor = getRandomColor();

        translateX.value = randomX;
        translateY.value = randomY;
        Boxheight.value = randomHeight;
        Boxwidth.value = randomWidth;
        color.value = randomColor;

    };

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) },
            { translateY: withSpring(translateY.value) },
        ],
        width: withSpring(Boxwidth.value),
        height: withSpring(Boxheight.value),
        backgroundColor: withTiming(color.value)
    }));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity onPress={handlePress}>
                <Animated.View
                    style={[
                        {
                            backgroundColor: '#b58df1',
                            borderRadius: 10,
                            position: "absolute",
                        },
                        animatedStyles
                    ]}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Animation;
