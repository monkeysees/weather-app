function assertUnreachable(x: never): never {
  throw Error(`Should not get here. Provided value: ${x}`);
}

// eslint-disable-next-line import/prefer-default-export
export { assertUnreachable };
