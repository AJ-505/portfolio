import type { ReactElement } from "react";
import { Prototype as Mixer } from "./proto-mixer/Prototype";
import { Prototype as Catalog } from "./proto-catalog/Prototype";
import { Prototype as Constellation } from "./proto-constellation/Prototype";
import { Prototype as Riso } from "./proto-riso/Prototype";
import { Prototype as Blueprint } from "./proto-c/Prototype";
import { Prototype as StampAlbum } from "./proto-g/Prototype";

export type ProtoNumber = 2 | 3 | 4 | 5 | 6 | 7;

const PROTO_TYPES: Record<ProtoNumber, () => ReactElement | null> = {
  2: Mixer,
  3: Catalog,
  4: Constellation,
  5: Riso,
  6: Blueprint,
  7: StampAlbum,
};

export function PrototypeRoutes({ no }: { no: ProtoNumber }) {
  const Cmp = PROTO_TYPES[no];
  return <Cmp />;
}
