export default function Navbar(props) {
  return (
    <div data-component=\"Navbar\" style={{ padding: 12 }}>
      {props?.children || \"Navbar component\"}
    </div>
  );
}
