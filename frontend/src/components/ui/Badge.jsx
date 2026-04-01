export default function Badge(props) {
  return (
    <div data-component=\"Badge\" style={{ padding: 12 }}>
      {props?.children || \"Badge component\"}
    </div>
  );
}
