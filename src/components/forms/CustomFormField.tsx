import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "textarea" | "url";
  description?: string;
  rows?: number;
  disabled?: boolean;
}

export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  rows,
  disabled,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(e.target.valueAsNumber || 0);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
