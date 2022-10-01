
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../../../Services/Lightbox";
import { FetchActiveDiets } from "../../Store/Actions/FetchActiveDiets";
import { useAllDietMetadata } from "../../Store/Selectors/useAllDietMetadata";
import { useSelectedDiet } from "../../Store/Selectors/useSelectedDiet";
import { DietPicker } from "./Components/DietPicker";

import Icon from 'react-native-vector-icons/Ionicons';
import { DayView } from "./Components/DayView";
import { withTheme } from "@rneui/themed";

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        width,
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
        width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
        width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
})

type DietDayViewProps = {

}
export const DietDayView = withTheme<DietDayViewProps>((props) => {
    const dispatch = useDispatch();
    const client = useContext(Context);
    const [today, setToday] = useState(new Date());
    const dietMetadata = useSelector(useAllDietMetadata);
    const fetch = () => {
        const action:any = FetchActiveDiets.action({ client });
        dispatch(action)
    };

    const selectedDiet = useSelector(useSelectedDiet);
    useEffect(() => {

        setToday(new Date());
        let interval = setInterval(() => {
            setToday(new Date());
        }, 60000);
        fetch();
        return () => {
            clearInterval(interval);
        }
    }, []);
    return <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, height: 50}}>
                <DietPicker diets={dietMetadata}/>
            </View>
            <View style={{alignItems: 'center', width: 28, height: 50, marginTop: (50-28)/2, marginRight: 12 }}>
                <Icon size={28} name="calendar-outline"/>
            </View>
        </View>
        <View style={{ width: width, height: height}}>
            <DayView today={today} days={selectedDiet?.dates.activeDays || []} selectedDate={today} />
        </View>
    </View>;
});