import { useCallback } from "react";
import { useIntl } from "react-intl";

export type TranslateFn = (
  id: string,
  defaultMessage?: string,
  values?: Record<string, any>,
) => string;

const useTranslate = (): [TranslateFn, string] => {
  const intl = useIntl();

  const t: TranslateFn = useCallback(
    (id, defaultMessage, values) => {
      return intl.formatMessage({ id, defaultMessage }, values);
    },
    [intl],
  );

  return [t, intl.locale];
};

export default useTranslate;
