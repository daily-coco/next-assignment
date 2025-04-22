import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/outline";

interface IFormInputProps {
    type : string;
    icon ?: string;
    name : string;
    placehoder :string;
    required :boolean;
    errors? :string[];
}

export default function FormInput({type, icon, name, placehoder, required,  errors}:IFormInputProps) {
    console.log(errors)
    return (
        <div className='flex flex-col relative items-center'>
            {
                (icon === 'email')  
                ? (<EnvelopeIcon className="absolute top-[23px] left-4 transform -translate-y-1/2 w-5 h-5"/>) 
                : (icon === 'username') 
                ? (<UserIcon className="absolute top-[23px] left-4 transform -translate-y-1/2 w-5 h-5"/>) 
                : (icon === 'password') 
                ? (<KeyIcon className="absolute top-[23px] left-4 transform -translate-y-1/2 w-5 h-5"/>)
                : null
            }
            <input 
                type={type} 
                name={name}
                placeholder={placehoder}  
                required={required}
                className={`px-[45px] bg-transparent rounded-full w-full h-12 focus:outline-none ring-1 focus:ring-4 ring-neutral-200 focus:ring-green-600 border-none placeholder:text-neutral-400 `}
            />
            {
                errors?.map((error,index) => (
                    <p key={index} className='mt-2 text-red-500 font-medium text-xs'>
                        ❌ {error}
                    </p>
                ))
            }
        </div>
    )
}