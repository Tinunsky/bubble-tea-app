import { useContext } from "react";
import { EN_TRANSLATION } from "../constants/languageEn";
import { UserContext } from "../contexts/UserContext";
import { ES_LANG, ES_TRANSLATION } from "../constants/languageEs";

export function Text({ id }) {
  const { language } = useContext(UserContext);
  switch (language) {
    case ES_LANG:
      return <>{ES_TRANSLATION[id]}</>;
    default:
      return <>{EN_TRANSLATION[id]}</>;
  }
}
