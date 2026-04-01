export default function Input(props) {
  return (
    <div data-component=\"Input\" style={{ padding: 12 }}>
      {props?.children || \"Input component\"}
    </div>
  );
}
