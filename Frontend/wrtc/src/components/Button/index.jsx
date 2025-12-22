

const Button = ({
    label = 'Button',
    type = 'button', 
    className = '',
    disabled = false
}) => {

    return (
        <button 
            type={type} className={` text-white  bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
            rounded-lg text-sm block w-90 mx-auto items-center p-2.5 ${className}`} disabled={disabled}>{label}
        </button>
    )

}
export default Button