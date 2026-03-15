import { useCallback, useState } from 'react';

export const useSelection = (initialSelected: string[] = []) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected));
  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback((ids: string[], shouldSelect: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (shouldSelect ? next.add(id) : next.delete(id)));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const setSelected = useCallback((ids: string[]) => setSelectedIds(new Set(ids)), []);

  return {
    selectedIds: Array.from(selectedIds),
    selectedSet: selectedIds,
    toggle,
    toggleAll,
    clear,
    count: selectedIds.size,
    hasSelection: selectedIds.size > 0,
    setSelected,
  };
};
