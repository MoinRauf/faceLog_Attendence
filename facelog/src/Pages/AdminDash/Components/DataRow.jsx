import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDataRow = create(
  persist(
    (set) => ({
      dopen: true,
      rows: [],
      setRows: (rows) => set({ rows }),
      updateDopen: (open) => set({ dopen: open }),
    }),
    { name: "cdot_store_api" }
  )
);

export default useDataRow;
