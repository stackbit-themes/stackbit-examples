import styles from "./styles.module.css";
import classnames from "classnames";

export default function Button(props) {
  const { url, text, primary = true, extraClasses, ...rest } = props;
  const allClasses = classnames("button", extraClasses, primary ? styles.primary : null);
  return (
    <a className={allClasses} href={url} {...rest}>
      {text}
    </a>
  );
}
