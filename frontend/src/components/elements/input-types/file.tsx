import { cn, getErrorMessage } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, forwardRef, ComponentRef } from "react";
import { toast } from "sonner";
import { Button } from "../button";
import { InputProps } from "./string-input";
import { DescriptionLabel, ErrorLabel, Label } from "../label";

export type FileInputProps = {
  uploadingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  noFileMessage?: string;
  onUploadFinish?: (file: File) => void;
} & InputProps;

export type FileInputRef = ComponentRef<"input">;

const FileInput = forwardRef<FileInputRef, FileInputProps>((props, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const [animated, setAnimated] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const {
    onUploadFinish,
    label,
    uploadingMessage = "Uploading...",
    errorMessage = "Upload failed",
    successMessage,
    noFileMessage = "No file selected",
    ...rest
  } = props;

  const ANIM_DURATION = 800;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e);

    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      if (onUploadFinish) {
        try {
          onUploadFinish(file);
          setUploadError(false);
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(message);
          setFile(null);
          setUploadError(true);
        }
      }

      if (uploadError) return;

      if (animated) return;
      setAnimated(true);
      setTimeout(() => {
        setAnimated(false);
      }, ANIM_DURATION);
    }
  }

  function handleInputClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="relative flex w-full items-center gap-3 rounded-md">
        <input
          {...rest}
          type="file"
          className="hidden"
          ref={ref || inputRef}
          onChange={handleChange}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleInputClick}
          className={cn(
            "h-10 px-3",
            animated && "border-amber-500",
            uploadError && !animated && "border-red-500",
            file && !uploadError && !animated && "border-emerald-500"
          )}
        >
          {file ? "Change" : "Upload File"}
        </Button>
        <span
          className={cn(
            "line-clamp-1 text-ellipsis text-sm",
            file ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {animated
            ? uploadingMessage
            : file
              ? successMessage
                ? successMessage
                : file.name
              : uploadError
                ? errorMessage
                : noFileMessage}
        </span>
        <AnimatePresence>
          {animated && (
            <motion.div
              className="bg-primary absolute top-1/2 h-10 -translate-y-1/2 rounded-md"
              initial={{ width: 0 }}
              animate={{ width: animated ? "100%" : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIM_DURATION / 1000, bounce: 0 }}
            ></motion.div>
          )}
        </AnimatePresence>
      </div>

      {props.errors ? (
        <ErrorLabel htmlFor={props.id} errors={props.errors} />
      ) : (
        props.description && (
          <DescriptionLabel htmlFor={props.id}>{props.description}</DescriptionLabel>
        )
      )}
    </div>
  );
});

FileInput.displayName = "FileInput";

export { FileInput };
