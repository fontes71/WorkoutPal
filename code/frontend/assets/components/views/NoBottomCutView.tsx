import { ReactNode } from "react";
import { View } from "react-native";

type ViewOptions = {
    readonly marginBottom?: number,
    readonly children: ReactNode
}

export default function NoBottomCutView({marginBottom, children}: ViewOptions) {
    return (
        <>
            {children}
            {marginBottom 
                ? <View style={{height: marginBottom}}></View>
                : <View style={{height: 40}}></View>
            } 
        </>
    )
}