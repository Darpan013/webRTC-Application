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
        <div className="w-90 mx-auto">
            <label for={name} className="block mb-2 text-sm font-medium dark:text-[#ffffff] text-gray-800">{label}</label>

            <input type={type} id={name} className={`bg-gray-50 border border-gray-300 dark:bg-[#201f20] dark:text-[#ffffff] text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full items-center p-2.5 ${className}`} placeholder={placeholder}
             required={isRequired} value={value} onChange={onChange} />
        </div>
    )
}
export default Input