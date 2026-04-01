export default function CategoryGrid(props) {
  return (
    <div data-component="CategoryGrid" style={{ padding: 12 }}>
      {props?.children || "CategoryGrid component"}
    </div>
  );
}
