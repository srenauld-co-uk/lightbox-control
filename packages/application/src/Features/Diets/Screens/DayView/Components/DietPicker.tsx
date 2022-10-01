import React from "react"
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from "react-native";
import { DietMetadata } from "../../../Store/Selectors/useAllDietMetadata";
import { withTheme } from "@rneui/themed";
const styles = (theme:any) => StyleSheet.create({});
type DietPickerProps = {
    diets: Array<DietMetadata>
}
export const DietPicker = withTheme<DietPickerProps>(({diets}:DietPickerProps) => {
    return <Picker selectedValue={diets.find(r => r.selected)?.orderId}>
        {diets.map(r => <Picker.Item key={r.orderId} label={r.name} value={r.orderId} />)}
    </Picker>;
});