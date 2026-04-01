export default function AdminLayout(props) {
  return (
    <div data-component=\"AdminLayout\" style={{ padding: 12 }}>
      {props?.children || \"AdminLayout component\"}
    </div>
  );
}
