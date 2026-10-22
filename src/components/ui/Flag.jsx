import { getFlagUrl } from "../../utils/flagEmoji";

// windows limitation: flag emojis do not render on Windows, so show a PNG instead
function Flag({ emoji, size = "24x18", alt = "flag" }) {
  const src = getFlagUrl(emoji, size);
  if (!src) return null;
  return <img src={src} alt={alt} />;
}

export default Flag;
