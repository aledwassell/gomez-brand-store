import { onCleanup } from "solid-js";

/**
 * Not used yet
 */

export default function clickOutside(
  element: HTMLElement,
  accessor: () => void
) {
  const onClick = (event: MouseEvent) =>
    !element.contains(event.target as Node) && accessor();

  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
