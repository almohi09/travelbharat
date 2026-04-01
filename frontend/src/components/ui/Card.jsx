export default function Card(props) {
  return (
    <div data-component=\"Card\" style={{ padding: 12 }}>
      {props?.children || \"Card component\"}
    </div>
  );
}
