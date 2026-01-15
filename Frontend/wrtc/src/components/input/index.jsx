const Input = ({ 
    label = '',
    name = '', 
    type = 'text',
    className = '',
    isRequired = false,
    placeholder = '',
    value = '',
    onChange = () => {}, 
}) => {
    return (
        <div className="">
            {label&& (
                <label htmlFor={name} className="block ml-1 mb-2 text-sm font-medium dark:text-[#ffffff] text-gray-800">{label}</label>
            )}

            <input type={type} id={name} className={` block  p-2.5 ${className}`} placeholder={placeholder}
             required={isRequired} value={value}  onChange={onChange} />
        </div>
    )
}
export default Input