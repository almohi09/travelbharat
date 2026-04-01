export default function PlaceCard(props) {
  return (
    <div data-component=\"PlaceCard\" style={{ padding: 12 }}>
      {props?.children || \"PlaceCard component\"}
    </div>
  );
}
