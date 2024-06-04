import styles from "./ProgressBar.module.css";

export default function ProgressBar({ currentStep }) {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-6 col-start-3 flex items-center justify-center">
        <section className={styles.progressbar_container}>
          <ul className={styles.steps_container}>
            {steps.map((step) => (
              <li
                key={step}
                className={`${styles.step_item} ${
                  currentStep === step ? styles.current_item : ""
                }`}
              >
                <span className={styles.progress_count}>{step}</span>
                <span className={styles.step_label}></span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
