export default function Sidebar(props) {
  return (
    <div data-component=\"Sidebar\" style={{ padding: 12 }}>
      {props?.children || \"Sidebar component\"}
    </div>
  );
}
