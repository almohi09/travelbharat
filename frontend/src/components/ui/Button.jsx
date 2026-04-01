export default function Button(props) {
  return (
    <div data-component=\"Button\" style={{ padding: 12 }}>
      {props?.children || \"Button component\"}
    </div>
  );
}
