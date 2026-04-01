export default function HeroBanner(props) {
  return (
    <div data-component="HeroBanner" style={{ padding: 12 }}>
      {props?.children || "HeroBanner component"}
    </div>
  );
}
