import styles from "./styles.module.css";
import classnames from "classnames";

export default function HeroBanner(props) {
  const { path, fields } = props;

  const bgImageUrl = fields.image?.[0]?.secure_url;
  const bgStyle = bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : {};

  const textColor = fields.textColor?.toLowerCase() || "black";
  const sectionStyles = classnames(styles.hero, styles[textColor]);

  return (
    <section className={sectionStyles} data-sb-field-path={path} style={bgStyle}>
      <div className={styles.heroInner}>
        {fields.title && <h1 data-sb-field-path=".title">{fields.title}</h1>}
        {fields.subtitle && <h2 data-sb-field-path=".subtitle">{fields.subtitle}</h2>}
      </div>
    </section>
  );
}
