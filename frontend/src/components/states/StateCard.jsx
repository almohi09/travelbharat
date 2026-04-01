export default function StateCard(props) {
  return (
    <div data-component=\"StateCard\" style={{ padding: 12 }}>
      {props?.children || \"StateCard component\"}
    </div>
  );
}
