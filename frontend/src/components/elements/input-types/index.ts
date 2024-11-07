import { FileInputProps } from "./file";
import { InputProps } from "./string-input";

export * from "./string-input";
export * from "./file";
export * from "./checkbox";
export * from "./radio";

export type CombinedInputProps = FileInputProps & InputProps;
