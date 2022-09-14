import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const mockQuestions = [
  {
    id: 1,
    content: "¿Cuánto cuesta?",
  },
  {
    id: 2,
    content: "¿Cuántos dispositivos puedo vincular?",
  },
  {
    id: 3,
    content: "¿Qué contenido hay disponible?",
  },
  {
    id: 4,
    content: "¿Hay plazo forzoso?",
  },
  {
    id: 5,
    content: "¿Cómo puedo pagar?",
  },
];

const FrequestQuestion = props => {
  return (
    <div className={styles.container}>
      <h2>Preguntas frecuentes</h2>
      {mockQuestions.map(i => (
        <section className={styles.subContainer} key={i.id}>
          <div className={styles.ac}>
            <input
              className={styles.acInput}
              id={`ac-${i.id}`}
              name={`ac-${i.id}`}
              type="checkbox"
            />
            <label className={styles.acLabel} htmlFor={`ac-${i.id}`}>
              {i.content}
            </label>

            <article className={styles.acText}>
              <div className={styles.acSub}>
                <article className={styles.acSubText}>
                  <p>
                    But not only is the sea such a foe to man who is an alien to
                    it, but it is also a fiend to its own off-spring; worse than
                  </p>
                </article>
              </div>
            </article>
          </div>
        </section>
      ))}
    </div>
  );
};

FrequestQuestion.propTypes = {};

export default FrequestQuestion;
