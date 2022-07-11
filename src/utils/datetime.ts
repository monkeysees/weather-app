import { format } from "date-fns";

function formatDate(d: Date) {
  return format(d, "eee, d MMM");
}

// eslint-disable-next-line import/prefer-default-export
export { formatDate };
