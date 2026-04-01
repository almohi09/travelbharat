export default function Pagination(props) {
  return (
    <div data-component=\"Pagination\" style={{ padding: 12 }}>
      {props?.children || \"Pagination component\"}
    </div>
  );
}
