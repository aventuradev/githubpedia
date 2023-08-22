import { useEffect, useState } from "react";

 const useDebounced = (input, time = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(input);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input)
        }, input === '' ? 300 : time);

        return () => {
            clearTimeout(timeout);
        }

    }, [input, time]);

    return debouncedValue;
}

export default useDebounced