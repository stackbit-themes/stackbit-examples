import styles from "./styles.module.css";
import { Personalize, usePersonalize } from "@ninetailed/experience.js-next";
import { isDev } from "../../utils";
import { useVariantChoicesContext } from "../../utils/ninetailed";

const BASELINE_AUDIENCE = "Baseline";
const PERSONALIZED_VARIANT_ID = "-1";

function getVariants(props) {
  const variants =
    props.fields.nt_variants?.map((item) => ({
      ...item,
      audience: {
        id: item.fields.nt_audience?.fields?.nt_audience_id,
        name: item.fields.nt_audience?.fields?.nt_name
      }
    })) || [];

  const variantsWithBaseline = [
    {
      audience: {
        name: BASELINE_AUDIENCE
      },
      ...props
    },
    ...variants
  ];

  return [variants, variantsWithBaseline];
}

const withPersonalization =
  (Component, titleField = "title") =>
  ({ ...baselineProps }) => {
    const [variants, variantsWithBaseline] = getVariants(baselineProps);
    if (!isDev) {
      return <Personalize component={Component} variants={variants} {...baselineProps} />;
    }

    function ActualComponent(props) {
      const componentProps = { ...props, path: null };
      return (
        <div data-sb-object-id={componentProps._id}>
          <Component {...componentProps} />
        </div>
      );
    }

    if (variants.length === 0) {
      return (
        <NotYetPersonalized>
          <ActualComponent {...baselineProps} />
        </NotYetPersonalized>
      );
    }

    const { loading, variant: personalizedVariant } = usePersonalize(
      baselineProps,
      variants
    );

    const { choices, updateChoice } = useVariantChoicesContext();
    const userSelectedVarId = choices[baselineProps._id] || PERSONALIZED_VARIANT_ID;

    const currentVariant =
      userSelectedVarId === PERSONALIZED_VARIANT_ID
        ? personalizedVariant
        : variantsWithBaseline.find((v) => v._id === userSelectedVarId) ||
          personalizedVariant;

    if (loading && userSelectedVarId === PERSONALIZED_VARIANT_ID) {
      return (
        <HiddenBaseline>
          <ActualComponent {...baselineProps} />
        </HiddenBaseline>
      );
    }

    function selectVariantId(selectedId) {
      console.log("selectVariantId", baselineProps._id, selectedId);
      updateChoice(baselineProps._id, selectedId);
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <label htmlFor="variant-selector">Variant:</label>
          <VariantSelector
            variantsWithBaseline={variantsWithBaseline}
            personalizedVariant={personalizedVariant}
            userSelectedVarId={userSelectedVarId}
            selectVariantId={selectVariantId}
            titleField={titleField}
          />
        </div>
        <ActualComponent {...currentVariant} />
      </div>
    );
  };

function VariantSelector({
  variantsWithBaseline,
  personalizedVariant,
  userSelectedVarId,
  selectVariantId,
  titleField
}) {
  return (
    <select
      id="variant-selector"
      onChange={(e) => selectVariantId(e.target.value)}
      value={userSelectedVarId}
    >
      <option value={PERSONALIZED_VARIANT_ID}>
        Personalized ({personalizedVariant.fields[titleField]})
      </option>
      <optgroup label="Manual Selection">
        {variantsWithBaseline.map((variant) => {
          const id = variant._id;
          return (
            <option key={id} value={id}>
              {variant.fields[titleField]} ({variant.audience.name})
            </option>
          );
        })}
      </optgroup>
    </select>
  );
}

function NotYetPersonalized({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>Personalization Opportunity</div>
      {children}
    </div>
  );
}

function HiddenBaseline({ children }) {
  return <div style={{ visibility: "hidden" }}>{children}</div>;
}

export default withPersonalization;
