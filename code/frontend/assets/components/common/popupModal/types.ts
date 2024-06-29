import { DimensionValue } from "react-native"

export type PopupModalProps = {
    transparent: boolean,
    visible: boolean,
    closeModal: () => void,
    margin: DimensionValue,
    children: React.ReactNode
}