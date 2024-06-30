type Data = {
    label: string,
    value: string
}
  
type DropdownMenuProps = {
  data: Data[],
  value: any,
  setValue: React.Dispatch<React.SetStateAction<any>>
}
  