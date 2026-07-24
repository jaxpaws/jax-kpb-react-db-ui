export default function RadioButton({ label, inputId, value, listName, selectedValue, handleChange }:
    { label: string, inputId: string, value: string, listName: string, selectedValue?: string, handleChange?: (event: any) => void }
) {
    return (
        <span className="flex flex-row items-center">
            <input
                type="radio"
                id={inputId}
                name={listName}
                value={value}
                checked={selectedValue === value}
                onChange={handleChange}
                className="h-[20px] w-[20px]">
            </input>
            <label htmlFor={inputId} className="ml-1 text-[1.06rem]">{label}</label>
        </span>
    );
}