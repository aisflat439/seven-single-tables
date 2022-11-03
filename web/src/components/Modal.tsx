import { Dialog } from "@headlessui/react";

export type ModalProps = {
  children?: React.ReactNode;
  content?: string;
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
};

export const Modal = ({
  children,
  content,
  isOpen,
  setIsOpen,
  title,
}: Omit<ModalProps, "id">) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm lg:max-w-lg rounded bg-white p-4">
          <Dialog.Title className="text-xl">{title}</Dialog.Title>
          {content && (
            <Dialog.Description className="my-4">{content}</Dialog.Description>
          )}
          {children}
          <div className="flex justify-end text-blue-400">
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
