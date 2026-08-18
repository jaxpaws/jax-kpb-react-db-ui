export function SearchBar({ multiSelectName, currValue, handleChange }:
    { multiSelectName: string, currValue: string, handleChange: (event: any) => void }
) {
    return (
        <span>
            <label htmlFor={`${multiSelectName}-search`} className="sr-only">Type to Filter Options</label>
            <input
                id={`${multiSelectName}-search`}
                type="text"
                name={`${multiSelectName}-search`}
                value={currValue}
                className={`block p-1 border rounded-sm bg-white p-1 w-full sm:w-64`}
                aria-required="false"
                onChange={handleChange}>
            </input>
        </span>
    );
}