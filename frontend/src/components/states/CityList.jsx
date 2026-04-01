export default function CityList(props) {
  return (
    <div data-component=\"CityList\" style={{ padding: 12 }}>
      {props?.children || \"CityList component\"}
    </div>
  );
}
