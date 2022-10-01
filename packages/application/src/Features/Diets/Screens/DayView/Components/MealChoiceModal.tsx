import { Meal } from "@srenauld-co-uk/lightbox-client/dist/diet/dto/meal.dto";
import { ListItem, Text, useTheme } from "@rneui/themed";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from "react-native";

type ModalProps = {
    options: Meal;
    width: number;
    select: (meal:Meal) => void;
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1, flexWrap: 'wrap',
    },
    subtitleView: {
      flexDirection: 'row'
    },
  
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingTop: 4,
      marginLeft: -10,
      color: 'grey'
    },
    actionButton: {
      flexDirection: 'row',
      flex: 1,
    }
  })
  
export const MealChoiceModal = ({ width, options, select }:ModalProps) => {
    const { theme } = useTheme();
    return (<>
    { options.options.map( option => {
        return <ListItem key={option.option} style={{width}}>
        <ListItem.Content>
            <ListItem.Title style={{ width }}>{option.selected ? <Icon name="checkbox-outline"/> : <Icon name="square-outline" />} <Text>{option.name}</Text></ListItem.Title>
            <View style={styles.subtitleView}>

                <Text style={[styles.ratingText, { marginLeft: 0 }]}>{option.nutritionalValue.calories} kcal, {option.nutritionalValue.fat.total}g fat</Text>
            </View>
        </ListItem.Content>
    </ListItem> 
    })}
    </>);
}