export default function Footer(props) {
  return (
    <div data-component=\"Footer\" style={{ padding: 12 }}>
      {props?.children || \"Footer component\"}
    </div>
  );
}
