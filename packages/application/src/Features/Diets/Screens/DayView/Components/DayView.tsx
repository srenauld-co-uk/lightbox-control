import React, { useContext, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { Day } from '@mandl-tv/lightbox-client/dist/diet/dto/day.dto';
import { Button, Card, Text, withTheme } from "@rneui/themed";
import { Context as SettingsContext } from '../../../../../Services/AppSettings';
import format from "date-fns/fp/formatWithOptions";
import pl from 'date-fns/locale/pl';
import en from 'date-fns/locale/en-US';
import { ListItem } from "@rneui/base";
import Icon from 'react-native-vector-icons/Ionicons';
import { RefreshControl, TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { MealContainer } from "./MealContainer";
import { isToday } from "date-fns";

const { width, height } = Dimensions.get("screen");

type DayViewProps = {
    today: Date,
    selectedDate: Date,
    days: Array<Day>,
}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1, flexWrap: 'wrap',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingImage: {
        height: 19.21,
        width: 100
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      }
})

const toLocale = (locale: "en" | "pl") => {
    switch (locale) {
        case "pl": 
            return pl;
        case "en":
        default:
            return en;
    }
}

const isSameDate = (today:Date, d:Date):boolean => (
    today.getDay() === d.getDay() &&
    today.getMonth() === d.getMonth() &&
    today.getFullYear() === d.getFullYear()
);
export const DayView = withTheme<DayViewProps>((props) => {
    const { days, selectedDate, today } = props;
    const { settings: { locale } } = useContext(SettingsContext);
    const selectedIdx = days.findIndex((day) => isSameDate(day.date, selectedDate));
    return <SwiperFlatList
        showPagination
        index={selectedIdx && days[selectedIdx] ? selectedIdx : undefined}
        style={styles.wrapper}
    >
    { days.map(diet => {
        return <View key={diet.date.toISOString()} style={ [ styles.slide1, { width } ] }>
            <Text h4>{format({ locale: toLocale(locale) }, "MM/dd")(diet.date)}</Text>
            <View>{diet && diet.courses.map((meal, idx) => <MealContainer key={idx} meal={meal} width={width} isToday={isSameDate(diet.date, today)} isEditable={diet.editable} />) }
            </View>
        </View>;
    })}
  </SwiperFlatList>
});