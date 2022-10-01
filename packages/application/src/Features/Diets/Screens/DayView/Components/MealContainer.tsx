import { Button, ListItem, Overlay, Text, useTheme } from "@rneui/themed"
import React, { useState } from "react"
import { Meal } from '@srenauld-co-uk/lightbox-client/dist/diet/dto/meal.dto';
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import { MealChoiceModal } from "./MealChoiceModal";

type MealContainerProps = {
  isToday: boolean,
  width: number,
  isEditable: boolean,
  meal: Meal,
}
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1, flexWrap: 'wrap',
  },
  subtitleView: {
    flexDirection: 'row',
    justifyContent: "flex-start"
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
export const MealContainer = ({ isToday, width, isEditable, meal }: MealContainerProps) => {
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const cancelEditing = () => setEditing(false);
  return (<>
            <Overlay isVisible={editing} onBackdropPress={cancelEditing} onAccessibilityEscape={cancelEditing}>
          <MealChoiceModal width={width} options={meal} select={() => setEditing(false)} />
        </Overlay>
    <ListItem style={{ width }}>
      <ListItem.Content>
        <ListItem.Title>{isEditable && <TouchableOpacity onPress={() => { console.log("Editing"); setEditing(true); }} style={{ width: 16, height: 16, alignContent: "center", justifyContent: "center", flex: 1 }}><Icon name="create-outline" size={16} /></TouchableOpacity>} <Text>{meal.selectedOption.name}</Text></ListItem.Title>
        <View style={styles.subtitleView}>
          {isToday && <>
            <TouchableOpacity style={{ width: 24, borderColor: "red", borderRadius: 1, height: 24, marginRight: 10 }}><Icon style={{ borderRadius: 1, borderColor: "red", color: theme.colors.primary }} name="fitness" size={24} /></TouchableOpacity>
          </>}
          <Text style={[styles.ratingText, { marginLeft: !isToday ? 0 : -10 }]}>{meal.selectedOption.nutritionalValue.calories} kcal, {meal.selectedOption.nutritionalValue.fat.total}g fat</Text>
        </View>
      </ListItem.Content>
    </ListItem></>);
};