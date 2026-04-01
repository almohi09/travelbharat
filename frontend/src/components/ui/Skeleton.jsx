export default function Skeleton(props) {
  return (
    <div data-component=\"Skeleton\" style={{ padding: 12 }}>
      {props?.children || \"Skeleton component\"}
    </div>
  );
}
