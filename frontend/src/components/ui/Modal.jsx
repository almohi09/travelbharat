export default function Modal(props) {
  return (
    <div data-component=\"Modal\" style={{ padding: 12 }}>
      {props?.children || \"Modal component\"}
    </div>
  );
}
