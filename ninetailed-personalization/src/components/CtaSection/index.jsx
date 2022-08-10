import styles from "./styles.module.css";
import Button from "../Button";

const CtaSection = (props) => {
  const { path, fields } = props;
  const {
    button: { fields: buttonData }
  } = fields;

  return (
    <section data-sb-field-path={path} className={styles["ctaContainer"]}>
      <div className={styles.ctaTexts}>
        <p data-sb-field-path=".title" className={styles.ctaTitle}>
          {fields.title}
        </p>
        <p data-sb-field-path=".subtitle" className={styles.ctaSubtitle}>
          {fields.subtitle}
        </p>
      </div>
      <Button
        data-sb-object-id={fields.button._id}
        data-sb-field-path=".buttonText"
        extraClasses={styles.ctaButton}
        url={buttonData.url}
        text={buttonData.buttonText}
      />
    </section>
  );
};

export default CtaSection;
