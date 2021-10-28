import { AuthRoot } from "./api";

const configs = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      AUTH_ROOT: AuthRoot,
    };
  } else {
    return {
      AUTH_ROOT: AuthRoot,
    };
  }
};

export default configs;
