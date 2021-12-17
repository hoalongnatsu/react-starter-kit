import { SampleState, name } from "@modules/Sample/reducers/sample";

import { RootState } from "@core/interfaces";
import { useSelector } from "react-redux";

interface Props {}

const SamplePage = (props: Props) => {
  const sample: SampleState = useSelector((state: RootState) => state[name]);

  return <div className="container sample">{sample.name}</div>;
};

export default SamplePage;
