import { PersistedState } from "runed"

export const storeSelect: PersistedState<null | number> = new PersistedState("select", null)
export const rgpdAff = $state({ rgpdAff: false })