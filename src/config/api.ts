
export const WSRoot =
  window.location.host === "play.excelmec.org"
    ? "wss://api.play.excelmec.org/"
    : "wss://backend.play.excelmec.org/";

export const ApiRoot =
  window.location.host === "play.excelmec.org"
    ? "https://api.play.excelmec.org/"
    : "https://backend.play.excelmec.org/";

export const AuthRoot =
  window.location.host === "play.excelmec.org"
    ? "https://accounts.excelmec.org/"
    : "https://staging.accounts.excelmec.org/";
