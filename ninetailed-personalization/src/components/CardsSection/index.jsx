import Card from "../Card";
import styles from "./styles.module.css";

export default function CardsSection(props) {
  const {
    path,
    fields: { cards }
  } = props;
  return (
    <section data-sb-field-path={path}>
      <div data-sb-field-path=".cards" className={styles.cards}>
        {cards &&
          cards.map((card) => (
            <Card key={card._id} data-sb-object-id={card._id} {...card.fields} />
          ))}
      </div>
    </section>
  );
}
