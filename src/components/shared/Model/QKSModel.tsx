// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/utils/cn";
// import React from "react";
// export type TQKSModel = {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   title: string;
//   titleClassName?: string;
//   descriptionClassName?: string;
//   onConfirmClassName?: string;
//   description?: string;
//   onConfirmText?: string;
//   children: React.ReactNode;
//   onConfirm?: () => void;
//   onCancel?: () => void;
// };

// const QKSModel = ({
//   open,
//   setOpen,
//   title,
//   description,
//   children,
//   onConfirmText,
//   onCancel,
//   onConfirm,
//   titleClassName,
//   descriptionClassName,
//   onConfirmClassName,
// }: TQKSModel) => {
//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle className={cn(titleClassName)}>
//             {title}
//           </AlertDialogTitle>
//           {description && (
//             <AlertDialogDescription>{description}</AlertDialogDescription>
//           )}
//         </AlertDialogHeader>
//         <div className={cn(descriptionClassName)}>{children}</div>
//         <AlertDialogFooter>
//           {onCancel && (
//             <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
//           )}
//           {onConfirm && (
//             <AlertDialogAction className={cn(onConfirmClassName)} onClick={onConfirm}>
//               {onConfirmText ? onConfirmText : "Continue"}
//             </AlertDialogAction>
//           )}
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
// export default QKSModel;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import React from "react";

export type TQKSModel = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  titleClassName?: string;
  descriptionClassName?: string;
  onConfirmClassName?: string;
  description?: string;
  onConfirmText?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onConfirmDisabled?: boolean;
};

const QKSModel = ({
  open,
  setOpen,
  title,
  description,
  children,
  onConfirmText,
  onCancel,
  onConfirm,
  titleClassName,
  descriptionClassName,
  onConfirmClassName,
  onConfirmDisabled = false,
}: TQKSModel) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={cn(titleClassName)}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className={cn(descriptionClassName)}>{children}</div>
        <DialogFooter>
          {onCancel && (
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="mr-2"
            >
              Cancel
            </Button>
          )}
          {onConfirm && (
            <Button
              className={cn(onConfirmClassName)}
              onClick={onConfirm}
              disabled={onConfirmDisabled}
            >
              {onConfirmText ? onConfirmText : "Continue"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QKSModel;
