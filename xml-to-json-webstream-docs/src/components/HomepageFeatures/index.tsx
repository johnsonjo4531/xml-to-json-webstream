import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to use",
    description: (
      <>
        Super simple and modern API just send in options and loop over the
        results thanks to Async Iterators.
      </>
    ),
  },
  {
    title: "Get just what you need",
    description: (
      <>
        You can Filter and parse your xml. Did you want to get only the
        &lt;image/&gt; tags from your xml? No problem!{" "}
      </>
    ),
  },
  {
    title: "Emit when you want",
    description: (
      <>
        Did you want to emit the content of an rss feed, but only as it's
        streaming in piece by piece? it works for that too. Want a verbose
        option that emits depth first search style? That's always an option as
        well.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
