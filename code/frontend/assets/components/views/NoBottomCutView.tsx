import { View } from "react-native";

export default function NoBottomCutView({children}: any) {
    return (
        <>
            {children}
            <View style={{height: 40}}></View>
        </>
    )
}