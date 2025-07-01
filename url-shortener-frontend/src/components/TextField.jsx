const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`${className ? className : ""} font-semibold text-md text-zinc-100`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-md bg-zinc-700 text-zinc-100 placeholder-zinc-400 
          border ${errors[id]?.message ? "border-red-500" : "border-zinc-600"} 
          focus:border-blue-500 outline-none transition duration-150`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: "Minimum 6 character is required" }
            : null,
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                  message: "Invalid email",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid url",
                }
              : null,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-500 mt-0">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default TextField;
