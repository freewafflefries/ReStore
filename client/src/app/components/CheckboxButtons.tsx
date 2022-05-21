import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core"
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[]
    onChange: (items: string[]) => void;

}

export default function CheckboxButtons({ items, onChange, checked }: Props) {

    const [checkedItems, setCheckedItems] = useState(checked || [])



    function handleChecked(value: string) {
        console.log('handleChecked value', value)
        const currentIndex = checkedItems.findIndex(item => item === value);
        console.log('currentIndex', currentIndex)
        let newCheckedItems: string[] = []
        if (currentIndex === -1) newCheckedItems = [...checkedItems, value]

        else newCheckedItems = checkedItems.filter(item => item !== value)


        console.log('newCheckedItems', newCheckedItems)

        setCheckedItems(newCheckedItems)
        onChange(newCheckedItems)
    }

    return (
        <FormGroup

        >
            {items.map(item => {
                return <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedItems.indexOf(item) !== -1}
                            onClick={() => handleChecked(item)}
                        />}
                    label={item}
                    key={item} />
            })}
        </FormGroup>
    )
}
