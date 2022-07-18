function getErrorMsg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong";
}

// eslint-disable-next-line import/prefer-default-export
export { getErrorMsg };
