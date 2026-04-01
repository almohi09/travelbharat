export default function DataTable(props) {
  return (
    <div data-component="DataTable" style={{ padding: 12 }}>
      {props?.children || "DataTable component"}
    </div>
  );
}
