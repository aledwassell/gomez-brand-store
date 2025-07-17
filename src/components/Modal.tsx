import { JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { CircleX } from "lucide-solid";

interface ModalProps {
  title: string;
  children: JSX.Element;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

function Modal(props: ModalProps) {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Portal>
      <div
        class="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div class="bg-white p-6 max-w-md w-full mx-4 shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">{props.title}</h2>
            <button
              onClick={props.onClose}
              class="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
            >
              <CircleX />
            </button>
          </div>
          <div class="mb-4">{props.children}</div>
          <div class="flex justify-end space-x-2">
            <Show when={props.onCancel}>
              <button
                onClick={props.onClose}
                class="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </Show>
            <Show when={props.onConfirm}>
              <button
                onClick={props.onConfirm}
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </Show>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
