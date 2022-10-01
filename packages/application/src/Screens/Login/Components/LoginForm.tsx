import { useThemeMode, withTheme } from "@rneui/themed";
import { Input, Button } from '@rneui/themed';
import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    createButton: {
    }
});

type LoginFormProps = {
    editable: boolean,
    email: string,
    password: string,
    logIn: (f:{email: string, password: string}) => void,
    screenWidth: number
}
export const LoginForm = withTheme<LoginFormProps>((props) => {
    const { editable, screenWidth, email, password, logIn } = props;
    const { theme,  } = props;

    console.log(theme);
    
    const [currentEmail, setEmail] = useState(email || '');
    const [currentPassword, setPassword] = useState(password || '');
    return <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled
    >
        <View style={{width: screenWidth * 0.8, height: 60}}>
        <Input
            placeholder="Email"
            onChangeText={(e) => setEmail(e)}
            value={currentEmail}
            editable={ editable }
        />
        </View>
        <View style={{width:screenWidth * 0.8, height: 60}}>
        <Input
            editable={editable}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            value={currentPassword}
        />
        </View>
        <View style={{width: screenWidth*0.8, height: 60}}>
        <Button 
            disabled={!editable} 
            onPress={() => logIn({ email: currentEmail, password: currentPassword })} 
        >Log in</Button>
        </View>
    </KeyboardAvoidingView>
});