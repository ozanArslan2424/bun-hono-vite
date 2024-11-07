import { Checkbox, CombinedInputProps, FileInput, StringInput } from "./input-types";

export function Input(props: CombinedInputProps) {
  if (props.type === "file") {
    return <FileInput {...props} />;
  }

  if (props.type === "checkbox") {
    return <Checkbox {...props} />;
  }

  if (props.type === "hidden") {
    return <input {...props} type="hidden" />;
  }

  return <StringInput {...props} />;
}
