import styles from "./styles.module.css";
import { useNinetailed } from "@ninetailed/experience.js-next";
import toast from "react-hot-toast";
import { isDev } from "../../utils";

const Card = (props) => {
  const { title, subtitle, image, text, category, ...rest } = props;

  return (
    <div className={styles.card} {...rest}>
      {image && (
        <img
          data-sb-field-path=".image"
          src={image?.[0]?.secure_url}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <h2 data-sb-field-path=".title" className={styles.title}>
          {title}
        </h2>
        {subtitle && (
          <p data-sb-field-path=".subtitle" className={styles.subtitle}>
            {subtitle}
          </p>
        )}
        {text && (
          <p data-sb-field-path=".text" className={styles.text}>
            {text}
          </p>
        )}
        <div className="buttons">
          <EventButton label="Add to Cart" event="addToCart" payload={{ category }} />
          <EventButton label="Purchase" event="purchase" payload={{ category }} />
        </div>
      </div>
    </div>
  );
};

function EventButton({ label, event, payload }) {
  const { track } = useNinetailed();

  function reportEvent() {
    track(event, payload);
    if (isDev) {
      toast(() => (
        <span>
          <b>{event}</b> event sent with payload: {JSON.stringify(payload)}
        </span>
      ));
    }
  }

  return (
    <button className="button" onClick={reportEvent}>
      {label}
    </button>
  );
}

export default Card;
