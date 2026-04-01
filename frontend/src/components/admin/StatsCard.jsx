export default function StatsCard(props) {
  return (
    <div data-component=\"StatsCard\" style={{ padding: 12 }}>
      {props?.children || \"StatsCard component\"}
    </div>
  );
}
